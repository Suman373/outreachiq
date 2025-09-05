const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true },
    language: { type: String, default: "en" },
    emailNotifications: { type: Boolean, default: false },
    emailProvider: {
        enabled: { type: Boolean, default: false },
        config: {
            port: { type: Number, default: 465 },
            host: { type: String, default: "" },
            email: { type: String, default: "" },
            secure: { type: Boolean, default: true },
            appPass: { type: String },
        }
    },
    webhooksEnabled: { type: Boolean, default: false },
    webhooks: [],
    paymentMethods: [{ type: String }],
    twoFactorAuth: {
        enabled: { type: Boolean, default: false },
        config: { type: Object, default: {} }
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v,
                delete ret.emailProvider.config.appPass
        }
    },
    timestamps: true,
});

module.exports = mongoose.model('settings', SettingsSchema);