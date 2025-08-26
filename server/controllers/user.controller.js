const { findAllUsers, findUserById, editUser, removeUser } = require("../services/user.service");

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await findAllUsers();
        res.status(200).json({ message: 'All users fetched successfully', result: allUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Id is required" });
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({ message: "User with id not found" });
        }
        res.status(200).json({ message: "Fetched user successfully", result: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Id is required" });
        const updatedUser = await editUser(id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User with id not found" });
        }
        res.status(200).json({ message: "Updated user successfully", result: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Id is required" });
        const deletedUser  = await removeUser(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User with id not found" });
        }
        res.status(200).json({ message: "Deleted user successfully", result: deletedUser }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
