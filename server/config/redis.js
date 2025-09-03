const Redis = require('ioredis');
const { REDIS_CLIENT_URL } = require('./index');

const redisClient = new Redis(REDIS_CLIENT_URL, {
    connectTimeout: 2000,
    maxRetriesPerRequest: 1,
    retryStrategy: (times) => {
        if (times > 3) return null;
        return Math.min(times * 200, 2000); // retry after 200ms, 400ms, etc
    },
});
redisClient.on("connect", () => {
    console.log(`Redis client connected at ${REDIS_CLIENT_URL}`);
});
redisClient.on("error", (err) => {
    console.error("Redis client error:", err.message);
});

module.exports = redisClient;