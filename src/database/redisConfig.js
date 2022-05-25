require('dotenv').config
const Redis =  require('ioredis')
const {promisify} = require("util")

const redisClient = new Redis({
    port: process.env.REDIS_PORT, 
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS});

function getRedis(value) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value);

  // redisClient.get("")
}

function setRedis(key, value, time) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value, "EX", time*60);

  // redisClient.set("", "")
}

module.exports= { redisClient, getRedis, setRedis };