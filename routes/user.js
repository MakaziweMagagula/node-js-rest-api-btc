const express = require('express');
const userController = require('../controllers/user.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get('/get-user-details/:id',checkAuthMiddleware.checkAuth, userController.getUserDetails);
router.get('/get-all-users', userController.getAllUsers);
router.patch('/update-user-details/:id',checkAuthMiddleware.checkAuth, userController.updateUserDetails);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;