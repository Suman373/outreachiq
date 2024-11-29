const express = require('express');
const { FlowController } = require('../controllers');
const router = express.Router();

router.get('/');
router.get('/:id');
router.post('/new', );
// time, email body, subject and an email address 
router.post('/schedule', FlowController.scheduleFlow);
router.put('/:id');
router.delete('/:id');

module.exports = router;