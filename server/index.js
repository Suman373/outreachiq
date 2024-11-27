const express = require('express');
const {PORT} = require('./config/index');
const expressApp = require('./express');
const { databaseConnection } = require('./database');

const StartServer = async()=>{
    const app = express();
    await databaseConnection();
    await expressApp(app);
    app.listen(PORT,()=>{console.log(`Server listening at port ${PORT}`)})
}

StartServer();