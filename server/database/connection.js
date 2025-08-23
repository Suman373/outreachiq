const mongoose = require('mongoose');
const { MONGODB_URI, NODE_ENV } = require('../config/index');
const { Logger, LOG_LEVELS, LOG_PATHS } = require('../utils');

module.exports = async () => {
    try {
        const {connection: conn} = await mongoose.connect(MONGODB_URI);
        await conn.dropDatabase();
        if (NODE_ENV === "production") {
            Logger(LOG_LEVELS.INFO, LOG_PATHS.HEALTHLOG, { title: "DATABASE CONNECTION SUCCESSFUL", host: conn.host, port: conn.port })
        }
        console.log(`Database connected at ${mongoose.connection.host}:${mongoose.connection.port}`);
    } catch (error) {
        Logger(LOG_LEVELS.ERROR, LOG_PATHS.HEALTHLOG, { title: "DATABASE CONNECTION FAILED", message: error.message });
        console.log(`Error while connecting to db : ${error}`);
        process.exit(1);
    }
}