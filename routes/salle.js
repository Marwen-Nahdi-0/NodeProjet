const express = require('express')
const authenticate = require('../middleware/authenticate')
const SalleController = require('../Controller/salle')
const router = express.Router();

router.get('/',authenticate ,SalleController.findAll);
router.get('/:id',authenticate, SalleController.findOne);
router.post('/',authenticate, SalleController.create);
router.patch('/:id', authenticate,SalleController.update);
router.delete('/:id', authenticate,SalleController.destroy);
module.exports = router