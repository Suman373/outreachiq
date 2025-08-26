const express = require('express');
const cors = require('cors');
const { FlowRoute, AuthRoute, UserRoute } = require('./routes/index');

module.exports = async(app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true, limit:'10mb'}));
    app.use(cors({origin:"*"}));

    // status check
    app.get('/',(req,res)=> res.status(200).send("Welcome to OutreachIQ Backend Web Server"));

    // api routes
    app.use('/api/v1/auth',AuthRoute);
    app.use('/api/v1/flows', FlowRoute);
    app.use('/api/v1/users', UserRoute);
}