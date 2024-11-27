const express = require('express');
const cors = require('cors');

module.exports = async(app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true, limit:'1mb'}));
    app.use(cors({origin:"*"}));

    // api routes
}