const express = require('express');
const {PORT, NODE_ENV} = require('./config/index');
const expressApp = require('./express');
const { databaseConnection } = require('./database');
const { LOG_LEVELS, LOG_PATHS, Logger } = require('./utils');

const StartServer = async()=>{
    const app = express();
    await databaseConnection();
    await expressApp(app);
    if(NODE_ENV === "production"){
        Logger(LOG_LEVELS.INFO, LOG_PATHS.HEALTHLOG, {title:"SERVER STARTED SUCCESSFULLY", port: PORT});
    }
    app.listen(PORT,()=>{console.log(`Server listening at port ${PORT}`)});
}

StartServer();