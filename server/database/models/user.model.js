const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      flows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flow' }],
},{
    toJSON:{
        transform(doc,ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    }, timestamps: true
});

module.exports = mongoose.model('user', UserSchema);

