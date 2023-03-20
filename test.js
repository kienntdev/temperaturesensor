const fs=require('fs');
 
const HWSENSORPREFIX='/sys/bus/w1/devices/';
 
async function getSensors() {
  let sensors=[];
  const dir = await fs.promises.opendir(`${HWSENSORPREFIX}`);
  for await (const dirent of dir) {
    if (dirent.name.slice(0,3)=='28-') {
        sensors.push(dirent.name);
    }
  }
  return sensors;
}
 
// Print temperature reading from a given 1-Wire sensor
 
async function printTemp(sensor) {
  const dir = await fs.promises.opendir(`${HWSENSORPREFIX}/${sensor}/hwmon`);
  for await (const dirent of dir) {
    if (dirent.name.slice(0, 5)=='hwmon') {
      let temp = parseFloat(await fs.promises.readFile(`${HWSENSORPREFIX}/${sensor}/hwmon/${dirent.name}/temp1_input`))/1000.0;
      console.log(`${dirent.name} (${sensor}): ${temp}`);
    }
  }
}
 
(async function () {
  try {
    let a=await getSensors();
    a.forEach(x => printTemp(x));
  } catch(e) {
    console.error(`Error: ${e}`);
  }
})();