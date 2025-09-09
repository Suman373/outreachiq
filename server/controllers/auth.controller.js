
const { AUTH_SERVICE } = require('../services/index');
const { ValidateEmail, ValidatePassword } = require('../utils');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = await req.body;
        console.log(req.body);
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }
        if (!ValidateEmail(email)) {
            return res.status(400).json({ message: "Valid email is required" });
        }
        if (!ValidatePassword(password)) {
            return res.status(400).json({ message: "Valid password is required" });
        }
        const { user } = await AUTH_SERVICE.register({ name, email, password });
        return res.status(201).json({
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = await req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        if (!ValidateEmail(email)) {
            return res.status(400).json({ message: "Valid email is required" });
        }
        const { user, token } = await AUTH_SERVICE.login({ email, password });
        res.cookie("outreachiq-auth-token",
            token, {
            httpOnly: false,
            sameSite: "lax",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }
        )
        return res.status(200).json({
            message: 'User login successful',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        await res.clearCookie("outreachiq-auth-token", {
            httpOnly: false,
            secure: true,
            sameSite: "lax",
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const handleForgetPassword = async (req, res) => {
    try {
        const { email } = await req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });
        const validEmail = await AUTH_SERVICE.emailExist(email);
        if (!validEmail) throw new Error("Valid email doesn't exist");
        await AUTH_SERVICE.sendResetLink(email);
        res.status(200).json({ message: `Reset link has been sent to ${email} successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const handlePasswordReset = async (req, res) => {
    try {
        const { newPassword, token } = await req.body;
        if (!newPassword || !token) return res.status(400).json({ message: "Please fill the details correctly" });
        const updatedUser = await AUTH_SERVICE.resetUserPassword(newPassword, token);
        if (!updatedUser) throw new Error("Failed to reset password");
        await res.clearCookie("outreachiq-auth-token", {
            httpOnly: false,
            secure: true,
            sameSite: "lax",
        });
        res.status(200).json({ message: "Password has been reset successfully. Please login again." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    handleForgetPassword,
    handlePasswordReset
};
