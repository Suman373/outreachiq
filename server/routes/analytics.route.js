const express = require('express');
const { AnalyticsController } = require('../controllers');
const router = express.Router();

router.get('/:id/summary', AnalyticsController.getSummary);
router.get('/:id/quick-stats', AnalyticsController.getQuickStats);

module.exports = router;
