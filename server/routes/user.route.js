const express = require('express');
const { UserController } = require('../controllers');
const upload = require('../middleware/multer');
const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser); 
router.delete('/:id', UserController.deleteUser);
router.patch('/:id/profile-image', upload.single("image"), UserController.uploadUserProfileImg);

module.exports = router;