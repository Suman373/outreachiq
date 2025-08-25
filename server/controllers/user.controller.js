

const { register, login } = require('../services/auth.service');
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
        const { user } = await register({ name, email, password });
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
        const { user, token } = await login({ email, password });
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

module.exports = { registerUser, loginUser };
