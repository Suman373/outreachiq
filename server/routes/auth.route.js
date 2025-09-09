const express = require('express');
const router = express.Router();
const {AuthController} = require('../controllers/index');

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.get('/logout', AuthController.logoutUser);
router.post('/forgot-password', AuthController.handleForgetPassword);
router.post('/reset-password', AuthController.handlePasswordReset);

module.exports = router;