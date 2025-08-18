const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = require('../config/index');

const timeUnitsInSeconds = {
    "Minutes": 60,        // 1 minute = 60 seconds
    "Hours": 3600,        // 1 hour = 3600 seconds
    "Days": 86400,        // 1 day = 86400 seconds
    "Weeks": 604800       // 1 week = 604800 seconds
};

module.exports.GenerateSalt = async()=>{
    return await bcrypt.genSalt(10);
}


module.exports.HashPassword = async(password,salt)=>{
    return await bcrypt.hash(password,salt);
}

module.exports.ValidatePassword = async (password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword);
}


module.exports.GenerateJWT = async(payload)=>{
    try {
        const token =  await jwt.sign(payload, APP_SECRET,{
            expiresIn: "30d"
        });
        if(token) return token;
        else throw new Error("Token generation failed");
    } catch (error) {
        console.log(error);
    }
}

module.exports.ValidateJWT = async(req)=>{
    try {
        const token = req.get("Authorization");
        console.log(token);
        const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
        req.user = payload;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.ConvertToSeconds = (val,unit)=>{
    return val * timeUnitsInSeconds[unit]
}