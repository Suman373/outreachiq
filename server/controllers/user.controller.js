const { USER_SERVICE } = require('../services/index');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await USER_SERVICE.findAllUsers();
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
        const user = await USER_SERVICE.findUserById(id);
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
        const updatedUser = await USER_SERVICE.editUser(id, req.body);
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
        const deletedUser = await USER_SERVICE.removeUser(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User with id not found" });
        }
        res.status(200).json({ message: "Deleted user successfully", result: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const uploadUserProfileImg = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Id is required" });
        if (!req.file || !req.file.location || !req.file.key) {
            return res.status(400).json({ message: "Image upload failed" });
        }
        const updatedUser = await USER_SERVICE.uploadProfileImage(id, req.file.location, req.file.key);
        if (!updatedUser) throw new Error("Failed to save profile image");
        res.status(200).json({ message: "Profile image uploaded successfully", result: updatedUser.profileImage.url});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    uploadUserProfileImg,
};

