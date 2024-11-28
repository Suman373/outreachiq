const express = require('express');
const router = express.Router();
const {UserController} = require('../controllers/index');

router.get('/');
router.get('/:id');
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.put('/:id');
router.delete('/:id');

module.exports = router;