const mongoose = require('mongoose');

const NodeSubSchema = new mongoose.Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String },
    label: { type: String },
    position: {
        x: { type: Number },
        y: { type: Number }
    },
    emailType: { type: String, enum: ["template", "custom"], default: "template" },
    subject: { type: String },
    body: { type: String },
    delay: { type: String },
    format: { type: String },
    aiGenerated: { type: Boolean, default: false }
});


const EdgeSubSchema = new mongoose.Schema({
    id: { type: String, required: true },
    source: { type: String },
    target: { type: String }
})

const FlowSchema = new mongoose.Schema({
    flowId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    userId: { type: String, required: true },
    nodes: [NodeSubSchema],
    edges: [EdgeSubSchema],
    scheduled: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "scheduled", "failed", "completed"], default: "draft"},
    leads: [{
        name: { type: String, required: true },
        email: { type: String, required: true },
    }]
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    }, timestamps: true
});

module.exports = mongoose.model('flow', FlowSchema);