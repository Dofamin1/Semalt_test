require("dotenv").config();
const redis = require("redis");
const bluebird = require("bluebird");

const redisController = {
  instance: null,
  createInstance(onConnectCallback) {
    bluebird.promisifyAll(redis.RedisClient.prototype);
    bluebird.promisifyAll(redis.Multi.prototype);
    this.instance = redis.createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST
    );
    this.instance.on("error", err => console.log("Error in redis " + err));
    this.instance.on("connect", onConnectCallback);
  }
};

module.exports = redisController;
