const mongoose = require('mongoose');

const FlowSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    startNode: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', required: true },
    nodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Node' }],
    edges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Edge' }],
},{
    toJSON:{
        transform(doc,ret){
            delete ret.__v;
        }
    }, timestamps:true
});

module.exports = mongoose.model('flow', FlowSchema);