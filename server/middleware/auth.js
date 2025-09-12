const { APP_SECRET } = require("../config");
const { UserModel } = require("../database/models");
const { ValidateJWT } = require("../utils");

const verifyAuthRequest = async (req, res, next) => {
    try {
        const token = req?.cookies["outreachiq-auth-token"];
        if (!token) return res.status(401).json({ message: "Unauthorized: No token found" });
        const { valid, payload } = await ValidateJWT(token, APP_SECRET);
        // console.log(valid,payload);
        if (!valid) return res.status(403).json({ message: "Forbidden: Token invalid or expired" });
        const id = payload.id;
        const user = await UserModel.findOne({ id });
        if (!user) return res.status(404).json({ message: "User with id not found" });
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error in auth middleware : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { verifyAuthRequest };