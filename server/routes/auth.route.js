const express = require('express');
const router = express.Router();
const {AuthController} = require('../controllers/index');

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);

module.exports = router;