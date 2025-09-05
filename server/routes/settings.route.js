const express = require('express');
const { SettingsController } = require('../controllers');
const router = express.Router();

router.post('/', SettingsController.addNewSettings);
router.get('/', SettingsController.getAllSettings);
router.get('/:id', SettingsController.getSettingsByUserId);
router.patch('/:id', SettingsController.updateSettings);
router.patch('/reset/:id', SettingsController.resetSettings);
router.delete('/:id', SettingsController.deleteSettings);

module.exports = router;