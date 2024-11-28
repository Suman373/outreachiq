const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    nodeId:{type:String, required:true},
    flowId:{type:String, required: true},
    type:{type:String},
    label:{type:String},
    position:{
        X:{type:Number},
        Y:{type:Number}
    },
    subject:{type:String},
    body:{type:String},
    recipients: [{type:String}],
    delay:{type:Number},
    nextNode:{type:mongoose.SchemaTypes.ObjectId, ref:'Node'},
},{timestamps:true});

module.exports = mongoose.model('node', NodeSchema);