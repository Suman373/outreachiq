const express = require('express');
const cors = require('cors');
const { UserRoute } = require('./routes/index');

module.exports = async(app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true, limit:'1mb'}));
    app.use(cors({origin:"*"}));

    // api routes
    app.use('/users',UserRoute);
}