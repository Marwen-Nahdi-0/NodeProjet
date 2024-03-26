const express = require('express')
const SalleController = require('../Controller/salle')
const router = express.Router();
router.get('/', SalleController.findAll);
router.get('/:id', SalleController.findOne);
router.post('/', SalleController.create);
router.patch('/:id', SalleController.update);
router.delete('/:id', SalleController.destroy);
module.exports = router