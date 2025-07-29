const mongoose = require('mongoose');

const EdgeSchema = new mongoose.Schema({
    id:{type:String, required:true},
    flowId:{type:String, required: true},
    source:{type: String},
    target:{type: String}
},{timestamps:true});

module.exports = mongoose.model('edge', EdgeSchema);