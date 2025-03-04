const fs = require('fs');

fs.writeFileSync("./test.txt", "Hello world");

const data = fs.readFileSync('./test.txt', 'utf-8');
console.log("data :", data);

const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
console.log("filePath :",filePath);

const os = require('os');
console.log("os platform :", os.platform());
console.log("os  memory:", os.freemem());
console.log("os total memory:", os.totalmem());
console.log("os  directory:", os.homedir());
console.log("os  hostname:", os.hostname());
console.log("os  user info:", os.userInfo());
// console.log("os  cpu details:", os.cpus());
// console.log("os  network:", os.networkInterfaces());
// console.log("os  :", os.uptime());
// console.log("os  type:", os.type());
// console.log("os  release:", os.release());
// console.log("os :", os.arch());
// console.log("os :", os.endianness());
// console.log("os :", os.loadavg());
// console.log("os :", os.constants);
// console.log("os :", os.EOL);
