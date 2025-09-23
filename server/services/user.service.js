const { AWS_BUCKET_NAME } = require('../config');
const { UserModel } = require('../database/models');
const { DeleteFileFromS3 } = require('../utils');

const findAllUsers = async () => {
    return await UserModel.find({});
}

const findUserById = async (id) => {
    return await UserModel.findOne({ id }).populate("flows");
}

const editUser = async (id, payload) => {
    return await UserModel.findOneAndUpdate({ id: id }, { $set: payload }, { new: true, runValidators: true });
}

const removeUser = async (id) => {
    return await UserModel.findOneAndDelete({ id });
}

const uploadProfileImage = async (id, s3url, s3key) => {
    try {
        const user = await UserModel.findOne({ id });
        if (user.profileImage?.key) {
            await DeleteFileFromS3(AWS_BUCKET_NAME, user.profileImage.key);
        }
        return await UserModel.findOneAndUpdate({ id: id }, { $set: { profileImage: { url: s3url, key: s3key } } }, { new: true, runValidators: true });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    findAllUsers,
    findUserById,
    editUser,
    removeUser,
    uploadProfileImage
};