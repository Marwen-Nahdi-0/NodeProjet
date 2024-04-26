const express = require('express')
const UserController = require('../Controller/user')
const authenticate = require('../middleware/authenticate')
const router = express.Router();
router.get('/',UserController.findAll);
router.get('/:id' ,UserController.findOne);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.post('/delete/:id', UserController.destroy);
module.exports = router