const express = require('express');
const cors = require('cors');
const { UserRoute, FlowRoute, NodeRoute, EdgeRoute } = require('./routes/index');

module.exports = async(app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true, limit:'1mb'}));
    app.use(cors({origin:"*"}));

    // status check
    app.get('/',(req,res)=> res.send("Welcome to Email Sequence Tool Backend Web Server"));

    // api routes
    app.use('/api/v1/users',UserRoute);
    app.use('/api/v1/flows', FlowRoute);
    app.use('/api/v1/nodes', NodeRoute);
    app.use('/api/v1/edges', EdgeRoute);
    // fs.appendFile(path.join(__dirname, 'logs/runtimelog.jsonl'), JSON.stringify({status:"Connected", time: new Date(Date.now())})+"\n", (err)=>{
    //     if(err) console.log("File write failed");
    // });
}