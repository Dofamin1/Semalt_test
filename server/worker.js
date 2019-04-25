require("dotenv").config();
const http = require("http");
const pid = process.pid;
const googleApi = require("./googleApi");

const handlersList = {
  "/lighthouseResult/audits": googleApi.getAuditData
};

http
  .createServer(async (req, res) => {
    const handler = handlersList[req.url] || (() => null);
    const data = await handler();
    if (data) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(data);
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(process.env.PORT, () => {
    console.log(`Started server, pid - ${pid}`);
  });
