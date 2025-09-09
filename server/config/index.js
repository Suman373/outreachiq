require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET,
    NODE_ENV: process.env.NODE_ENV || "development",
    REDIS_CLIENT_URL: process.env.REDIS_CLIENT_URL,
    RESET_SECRET: process.env.RESET_SECRET,
}