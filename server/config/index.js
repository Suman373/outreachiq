require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET,
    NODE_ENV: process.env.NODE_ENV || "development",
    REDIS_CLIENT_URL: process.env.REDIS_CLIENT_URL,
    RESET_SECRET: process.env.RESET_SECRET,
    AWS_REGION_NAME: process.env.AWS_REGION_NAME,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
}