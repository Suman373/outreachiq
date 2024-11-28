const mongoose = require('mongoose');

const EdgeSchema = new mongoose.Schema({
    edgeId:{type:String, required:true},
    flowId:{type:String, required: true},
    source:{type:mongoose.SchemaTypes.ObjectId, ref:'Node'},
    target:{type:mongoose.SchemaTypes.ObjectId, ref:'Node'}
},{timestamps:true});

module.exports = mongoose.model('node', EdgeSchema);