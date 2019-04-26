require("dotenv").config();
const http = require("http");
const redisController = require("./modules/redis.js");

const routeHandlers = {
  "/lighthouseResult/audits": () => redisController.instance.getAsync("data")
};
const createServer = () => {
  http
    .createServer(async (req, res) => {
      const handler = routeHandlers[req.url] || (() => null);
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
      console.log(`Started process, pid - ${process.pid}`);
    });
};

redisController.createInstance(createServer);
