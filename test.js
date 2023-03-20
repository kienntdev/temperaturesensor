var ds18b20 = require("ds18b20");

// const fs = require("fs");

// const HWSENSORPREFIX = "/sys/bus/w1/devices/";
// const HWMON = "hwmon";

// async function getSensors() {
//   let sensors = [];
//   const dir = await fs.promises.opendir(`${HWSENSORPREFIX}`);
//   for await (const dirent of dir) {
//     if (dirent.name.slice(0, 3) == "28-") {
//       sensors.push(dirent.name);
//     }
//   }
//   return sensors;
// }

// // Print temperature reading from a given 1-Wire sensor
// async function printTemp(sensor) {
//   const dir = await fs.promises.opendir(`${HWSENSORPREFIX}/${sensor}/${HWMON}`);
//   for await (const dirent of dir) {
//     if (dirent.name.slice(0, 5) == HWMON) {
//       let temp =
//         parseFloat(
//           await fs.promises.readFile(
//             `${HWSENSORPREFIX}/${sensor}/${HWMON}/${dirent.name}/temp1_input`
//           )
//         ) / 1000.0;
//       console.log(`${dirent.name} (${sensor}): ${temp}`);
//     }
//   }
// }

(async function () {
  try {
    let ids = ds18b20.sensors((x, ids) => {
      if (x == null) {
        console.log(ids);
        return ids;
      }
    });

    if (ids) {
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        console.log(id);
        const temp = ds18b20.temperatureSync(id, {});
        console.log(temp);
      }
    }
  } catch (e) {
    console.error(`Error: ${e}`);
  }
})();
