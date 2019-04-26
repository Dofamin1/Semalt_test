const axios = require("axios");

class DataService {
  constructor() {
    this.url =
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed/?url=https://habr.com/";
    this.interval = 10000;
  }
  getAndSaveAuditData(redis) {
    return axios
      .get(this.url)
      .then(({ data }) => {
        const strigifiedData = JSON.stringify(data.lighthouseResult.audits);
        return redis.setAsync("data", strigifiedData);
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
