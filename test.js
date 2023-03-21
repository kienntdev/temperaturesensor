import { sensors as _sensors, temperatureSync } from "ds18b20";

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async function () {
  do {
    try {
      _sensors((err, sensors) => {
        if (err == null && sensors !== undefined && sensors.length > 0) {
          console.log(sensors);
          sensors.forEach((i) => {
            console.log(i);
            const temp = temperatureSync(i, {});
            console.log(temp);
          });
        } else {
          console.error(`Error: ${err}`);
        }
      });
    } catch (e) {
      console.error(`Error: ${e}`);
    }
    await sleep(10000);
  } while (true);
})();
