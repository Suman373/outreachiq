const express = require('express');
const { AIController } = require('../controllers');
const router = express.Router();

router.post('/:id/subject', AIController.generateSubjectLine);
router.post('/:id/body', AIController.generateEmailBody);

module.exports = router;