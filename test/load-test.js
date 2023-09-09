const { exec } = require('child_process');
const path = require('path');

const artilleryPath = path.resolve(__dirname, '../node_modules/.bin/artillery');

exec(`"${artilleryPath}" run load-test.yml`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(stdout);
});
