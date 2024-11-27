
const {UserModel} = require('../database/models/index');
const {GenerateJWT, GenerateSalt, HashPassword} = require('../utils/index');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    try {
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        const salt = await GenerateSalt();
        const hashedPassword = await HashPassword(password, salt);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            salt
        });

        const token = await GenerateJWT({_id:newUser._id});

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
            token:token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    registerUser
}