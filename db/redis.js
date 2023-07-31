const Redis = require('redis')
const { REDIS_URL, REDIS_PORT } = require('../config/config')
const redisClient = Redis.createClient({ url: `redis://${REDIS_URL}:${REDIS_PORT}` })

module.exports = redisClient
