const mongoose = require('mongoose');

const FlowSchema = new mongoose.Schema({
    flowId: {type: String, required: true, unique: true, index: true},
    name: { type: String, required: true },
    userId: { type: String, required: true },
    nodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'node' }],
    edges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'edge' }],
    scheduled: { type: Boolean, default: false},
},{
    toJSON:{
        transform(doc,ret){
            delete ret.__v;
        }
    }, timestamps:true
});

module.exports = mongoose.model('flow', FlowSchema);