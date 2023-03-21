var ds18b20 = require("ds18b20");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async function () {
  do {
    try {
      ds18b20.sensors((err, sensors) => {
        if (err == null && sensors !== undefined && sensors.length > 0) {
          console.log(sensors);
          sensors.forEach((i) => {
            console.log(i);
            const temp = ds18b20.temperatureSync(i, {});
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
