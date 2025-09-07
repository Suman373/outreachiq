const { findAllSettings, findSettingsByUserId, editSettings, createSettings, discardSettings } = require("../services/settings.service");

const addNewSettings = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: "userId is required" });
        const newSettings = await createSettings(userId);
        if (!newSettings) {
            return res.status(404).json({ message: "Settings with userId not found" });
        }
        res.status(201).json({ message: 'Settings added successfully', result: newSettings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllSettings = async (req, res) => {
    try {
        const allSettings = await findAllSettings();
        res.status(200).json({ message: 'All settings fetched successfully', result: allSettings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getSettingsByUserId = async (req, res) => {
    try {
        const { id: userId } = req.params;
        if (!userId) return res.status(400).json({ message: "userId is required" });
        const userSettings = await findSettingsByUserId(userId);
        if (!userSettings) {
            return res.status(404).json({ message: "Settings with userId not found" });
        }
        res.status(200).json({ message: "Fetched settings with userId successfully", result: userSettings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const updateSettings = async (req, res) => {
    try {
        const { id: userId } = req.params;
        if (!userId) return res.status(400).json({ message: "userId is required" });
        const updatedSettings = await editSettings(userId, req.body);
        if (!updatedSettings) {
            return res.status(404).json({ message: "Settings with userId not found" });
        }
        res.status(200).json({ message: "Updated settings successfully", result: updatedSettings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const resetSettings = async (req, res) => {
    try {
        const { id: userId } = req.params;
        if (!userId) return res.status(400).json({ message: "userId is required" });

        const defaultSettingsObj = {
            language: "en",
            emailNotifications: false,
            emailProvider: {
                enabled: false,
                config: {
                    port: 465,
                    host: "",
                    email: "",
                    secure: true,
                    appPass: "",
                }
            },
            webhooksEnabled: false,
            webhooks: [],
            paymentMethods: [],
            twoFactorAuth: {
                enabled: false,
                config: {}
            }
        };

        const newSettings = await editSettings(userId, defaultSettingsObj);
        if (!newSettings) {
            return res.status(404).json({ message: "Settings with userId not found" });
        }
        res.status(200).json({ message: "Settings reset successfully", result: newSettings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteSettings = async (req, res) => {
    try {
        const { id:userId } = req.params;
        if (!userId) return res.status(400).json({ message: "userId is required" });
        const deletedSetting = await discardSettings(userId);
        if (!deletedSetting) {
            return res.status(404).json({ message: "Settings with userId not found" });
        }
        res.status(200).json({ message: 'Settings deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    addNewSettings,
    getAllSettings,
    getSettingsByUserId,
    updateSettings,
    resetSettings,
    deleteSettings
};
