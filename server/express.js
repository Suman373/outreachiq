const express = require('express');
const cors = require('cors');
const { UserRoute, FlowRoute, NodeRoute, EdgeRoute } = require('./routes/index');

module.exports = async(app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true, limit:'1mb'}));
    app.use(cors({origin:"*"}));

    // api routes
    app.use('/users',UserRoute);
    app.use('/flows', FlowRoute);
    app.use('/nodes', NodeRoute);
    app.use('/edges', EdgeRoute);
}