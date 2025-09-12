const {UserModel} = require('../database/models');

const findAllUsers = async()=>{
    return await UserModel.find({});
}

const findUserById = async(id)=>{
    return await UserModel.findOne({id}).populate("flows");
}

const editUser = async(id, payload)=>{
    return await UserModel.findOneAndUpdate({id:id},{$set: payload},{new:true, runValidators: true});
} 

const removeUser = async(id)=>{
    return await UserModel.findOneAndDelete({id});
}

module.exports = {
    findAllUsers,
    findUserById,
    editUser,
    removeUser
};