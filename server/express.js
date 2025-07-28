const express = require('express');
const cors = require('cors');
const { UserRoute, FlowRoute, NodeRoute, EdgeRoute } = require('./routes/index');

module.exports = async(app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true, limit:'1mb'}));
    app.use(cors({origin:"*"}));

    // status check
    app.use('/',(req,res)=> res.send("Welcome to Email Sequence Tool Backend Web Server"));

    // api routes
    app.use('/users',UserRoute);
    app.use('/flows', FlowRoute);
    app.use('/nodes', NodeRoute);
    app.use('/edges', EdgeRoute);
}