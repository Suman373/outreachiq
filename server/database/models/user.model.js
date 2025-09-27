const mongoose = require('mongoose');
const { nanoid } = require('nanoid/non-secure');

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, default: () => nanoid(14) },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
    profileImage: {
        url: { type: String, default: "" },
        key: { type: String, default: "" }
    },
    country: { type: String, default: "in" },
    subscriptionPlanName: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
    quota: {
        flows: { type: Number, default: 1 },
        nodes: { type: Number, default: 4 },
        leads: { type: Number, default: 10 },
        emails: { type: Number, default: 40 },
        aiTokens: { type: Number, default: 500 }
    },
    usage: {
        flows: { type: Number, default: 0 },
        nodes: { type: Number, default: 0 },
        leads: { type: Number, default: 0 },
        emails: { type: Number, default: 0 },
        aiTokens: { type: Number, default: 0 }
    },
    renewalDate: { type: Date, required: true, default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    flows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'flow' }],
    passwordChangedAt: { type: Date }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        }
    }, timestamps: true
});

module.exports = mongoose.model('user', UserSchema);

