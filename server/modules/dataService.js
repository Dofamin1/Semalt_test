const axios = require("axios");
var crypto = require("crypto");

class DataService {
  constructor() {
    this.url =
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed/?url=https://habr.com/";
    this.interval = 10000;
    this.checksum = null;
  }
  generateChecksum(str) {
    return crypto
      .createHash("md5")
      .update(str, "utf8")
      .digest("hex");
  }
  getAndSaveAuditData(redis) {
    return axios
      .get(this.url)
      .then(({ data }) => {
        const stringifiedData = JSON.stringify(data.lighthouseResult.audits);
        const newChecksum = this.generateChecksum(stringifiedData);
        if (this.checksum !== newChecksum) {
          this.checksum = newChecksum;
          return redis.setAsync("data", stringifiedData);
        }
      })
      .catch(e => {
        console.error("Error -", e);
      });
  }
  startProcessingData(redis) {
    setInterval(this.getAndSaveAuditData.bind(this, redis), this.interval);
  }
}

module.exports = DataService;
