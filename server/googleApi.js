const axios = require("axios");

const googleApi = {
  url:
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed/?url=https://habr.com/",
  getAuditData() {
    return axios
      .get(googleApi.url)
      .then(({ data }) => {
        return JSON.stringify(data.lighthouseResult.audits);
      })
      .catch(e => {
        console.error("Error happen -", e);
      });
  }
};

module.exports = googleApi;
