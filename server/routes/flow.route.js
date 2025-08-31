const express = require('express');
const { FlowController } = require('../controllers');
const router = express.Router();

router.get('/', FlowController.getAllFlows);
router.get('/user/:id', FlowController.getFlowsByUser);
router.post('/schedule', FlowController.scheduleFlow);
router.patch('/:id');
router.delete('/:id');

module.exports = router;