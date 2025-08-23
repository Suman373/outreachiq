
const {UserModel} = require('../database/models/index');
const {GenerateJWT, GenerateSalt, HashPassword, ValidatePassword} = require('../utils/index');

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
        });

        const token = await GenerateJWT({id:newUser.id, subscriptionPlanName: newUser.subscriptionPlanName});

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
            token:token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const loginUser = async(req,res)=>{
    const { email, password } = req.body; 
    if ( !email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const existingUser = await UserModel.findOne({email:email});

        if(!existingUser) {
            return res.status(404).json({message: 'User with email does not exist'});
        }

        const validPass = await ValidatePassword(password, existingUser.password);

        if(!validPass) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const token = await GenerateJWT({id: existingUser.id, subscriptionPlanName: existingUser.subscriptionPlanName});
        return res.status(200).json({
            message: 'User login successful',
            user: existingUser,
            token: token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }

}

module.exports = {
    registerUser,
    loginUser
}