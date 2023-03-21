const ds18b20 = require("ds18b20");
const moment = require("moment");
const fs = require("fs");

const HWSENSORPREFIX = "/sys/bus/w1/devices/";

async function getSensors() {
  let sensors = [];
  const dir = await fs.promises.opendir(`${HWSENSORPREFIX}`);
  for await (const dirent of dir) {
    if (dirent.name.slice(0, 3) == "28-") {
      sensors.push(dirent.name);
    }
  }
  return sensors;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getDateTime() {
  return moment().format("yyyy-MM-DD:HH:mm:ss");
}

(async function () {
  do {
    try {
      const sensors = await getSensors();
      if (sensors.length > 0) {
        const temp = ds18b20.temperatureSync(i, {});
        console.log(`Time: ${getDateTime()} - ${temp}`);
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    }
    await sleep(10000);
  } while (true);
})();
