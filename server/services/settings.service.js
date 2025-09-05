const { SettingsModel } = require("../database/models");

const createSettings = async(userId)=>{
    if(SettingsModel.findOne({userId})){
        throw new Error("Settings already exists for userId");
    }
    return await SettingsModel.create({userId:userId});
} 

const findAllSettings = async()=>{
    return await SettingsModel.find({});
}

const findSettingsByUserId = async(userId)=>{
    return await SettingsModel.findOne({userId});
}

const editSettings = async(userId, payload)=>{
    return await SettingsModel.findOneAndUpdate({userId:userId},{$set: payload},{new:true, runValidators: true});
} 

const discardSettings = async(userId)=>{
    return await SettingsModel.findOneAndDelete({userId});
}

module.exports = {
    createSettings,
    findAllSettings,
    findSettingsByUserId,
    editSettings,
    discardSettings
};