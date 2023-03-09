const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/signup', userController.createUser);

router.post('/login', userController.loginUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;