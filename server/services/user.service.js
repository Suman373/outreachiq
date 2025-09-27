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
        if (!user) throw new Error("User with id not found");
        if (user.profileImage?.key) {
            await DeleteFileFromS3(AWS_BUCKET_NAME, user.profileImage.key);
        }
        return await UserModel.findOneAndUpdate({ id: id }, { $set: { profileImage: { url: s3url, key: s3key } } }, { new: true, runValidators: true });
    } catch (error) {
        throw error;
    }
}

const checkAndIncreaseUsage = async (id, type, value) => {
    try {
        const user = await UserModel.findOne({ id });
        if (!user) throw new Error("User with id not found");
        const maxQuota = user.quota[`${type}`];
        const currUsage = user.usage[`${type}`];
        if(currUsage >= maxQuota) throw new Error("Quota exceeded");
        const query = { id: id };
        query[`usage.${type}`] = { $lt : maxQuota };
        const update = { $inc: {[`usage.${type}`] : Number(value)} }; // this atomic operation will prevent race-conditions by concurrent requests from the user. value is the increment by number
        const updatedUser = await UserModel.findOneAndUpdate(
            query,
            update,
            { new: true}
        );
        if (!updatedUser) throw new Error("Quota exceeded");
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findAllUsers,
    findUserById,
    editUser,
    removeUser,
    uploadProfileImage,
    checkAndIncreaseUsage
};