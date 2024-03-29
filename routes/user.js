const express = require('express')
const UserController = require('../Controller/user')
const authenticate = require('../middleware/authenticate')
const router = express.Router();
router.get('/', authenticate,UserController.findAll);
router.get('/:id',authenticate ,UserController.findOne);
router.post('/', UserController.create);
router.patch('/:id',authenticate, UserController.update);
router.delete('/:id', authenticate,UserController.destroy);
module.exports = router