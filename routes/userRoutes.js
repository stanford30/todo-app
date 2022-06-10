const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const noteRouter = require('./noteRoutes');

const router = express.Router();
router.use('/:userId/notes', noteRouter);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);
router.delete('/deleteMe', userController.deleteMe);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);

module.exports = router;
