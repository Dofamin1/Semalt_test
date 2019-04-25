require("dotenv").config();
const http = require("http");
const pid = process.pid;

http
  .createServer((req, res) => {
    res.write(`Handled by process ${pid}\n`);
    res.end();
  })
  .listen(process.env.PORT, () => {
    console.log(`Started server, pid - ${pid}`);
  });
