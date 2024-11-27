const express = require('express');
const { registerUser } = require('../controllers/user.controller');
const router = express.Router();


router.get('/');
router.get('/:id');
router.post('/', registerUser);
router.put('/:id');
router.delete('/:id');

module.exports = router;