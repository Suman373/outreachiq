const mongoose = require('mongoose');

const AILogsSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    type: { type: String, required: true, enums: ["text-subject","text-body","image"] },
    prompt: { type: String, },
    response: { type: String },
    error: {type: String},
    tokensUsed: { type: Number },
    status: { type: String, default: "success", enum: ["success", "failed"] }
}, { timestamps: true });

module.exports = mongoose.model("ailogs", AILogsSchema);