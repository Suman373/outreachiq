const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../config/index');
const fs = require('fs');
const path = require('path');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/s3client.js');

const timeUnitsInSeconds = {
    "Minutes": 60,        // 1 minute = 60 seconds
    "Hours": 3600,        // 1 hour = 3600 seconds
    "Days": 86400,        // 1 day = 86400 seconds
    "Weeks": 604800       // 1 week = 604800 seconds
};

module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt(10);
}

module.exports.HashPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
}

module.exports.ValidateHashedPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}


module.exports.GenerateJWT = async (payload, secret, expiry) => {
    try {
        const token = await jwt.sign(payload, secret, {
            expiresIn: expiry
        });
        if (token) return token;
        else throw new Error("Token generation failed");
    } catch (error) {
        console.log(error);
    }
}

module.exports.ValidateJWT = async (token, secret) => {
    try {
        const payload = jwt.verify(token, secret);
        return { valid: true, payload };
    } catch (error) {
        console.log(error);
        return { valid: false, payload: null };
    }
}

module.exports.ConvertToSeconds = (val, unit) => {
    return val * timeUnitsInSeconds[unit]
}

module.exports.LOG_LEVELS = Object.freeze({
    WARN: "WARN",
    ERROR: "ERROR",
    INFO: "INFO"
});

module.exports.LOG_PATHS = Object.freeze({
    HEALTHLOG: "healthlog",
    SERVICELOG: "servicelog",
    AUTHLOG: "authlog",
    CONTROLLERLOG: "controllerlog"
})


module.exports.Logger = (level, filename, data) => {
    try {
        const timeStamp = new Date().toISOString();
        const logContent = {
            level,
            time: timeStamp,
            ...data
        };
        fs.appendFile(path.join(__dirname, "..", "logs", `${filename}.jsonl`), JSON.stringify(logContent, 2, null), (err) => {
            if (err) {
                throw new Error(err);
            }
        });
    } catch (error) {
        console.log(`Failed to write in ${filename} : ${error}`);
    }
}


module.exports.ValidateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

module.exports.ValidatePassword = (password) => {
    const regex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
};


module.exports.DeleteFileFromS3 = async (bucket, key) => {
    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
    });
    return await s3.send(command);
};
