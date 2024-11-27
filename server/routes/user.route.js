const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const router = express.Router();


router.get('/');
router.get('/:id');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id');
router.delete('/:id');

module.exports = router;