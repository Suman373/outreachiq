const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { 
    FlowRoute,
    AuthRoute,
    UserRoute, 
    AnalyticsRoute, 
    SettingsRoute
} = require('./routes/index');
const { verifyAuthRequest } = require('./middleware/auth');

module.exports = async(app)=>{
    app.use(cors({origin:"*"}));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended:true, limit:'10mb'}));

    // status check
    app.get('/',(req,res)=> res.status(200).send("Welcome to OutreachIQ Backend Web Server"));

    // api routes
    app.use('/api/v1/auth', AuthRoute);
    app.use('/api/v1/users', UserRoute);
    app.use('/api/v1/flows', FlowRoute);
    app.use('/api/v1/analytics', AnalyticsRoute);
    app.use('/api/v1/settings', SettingsRoute);
}