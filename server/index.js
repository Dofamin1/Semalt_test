const cluster = require("cluster");

if (cluster.isMaster) {
  const DataService = require("./modules/dataService");
  const redisController = require("./modules/redis");
  const os = require("os");
  const dataService = new DataService();
  const cpus = os.cpus().length;

  redisController.createInstance(async () => {
    console.log("wait until data be retrieved");
    await dataService.getAndSaveAuditData(redisController.instance);
    for (let i = 0; i < cpus; i++) {
      cluster.fork();
    }
    dataService.startProcessingData(redisController.instance);
  });
} else {
  require("./serverWorker.js");
}
