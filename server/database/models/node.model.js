const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    id: { type: String, required: true },
    flowId: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: String },
    position: {
        x: { type: Number },
        y: { type: Number }
    },
    emailType: { type: String, enum: ["template", "custom"], default: "template" },
    subject: { type: String },
    body: { type: String },
    recipients: [{ type: String }],
    delay: { type: String },
    format: { type: String },
    aiGenerated: { type: Boolean, default: false}
}, { timestamps: true });

module.exports = mongoose.model('node', NodeSchema);