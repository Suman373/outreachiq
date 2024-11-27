const mongoose = require('mongoose');
const {MONGODB_URI} = require('../config/index');

module.exports = async()=>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Error while connecting to db");
        console.log(error);
        process.exit(1);
    }
}