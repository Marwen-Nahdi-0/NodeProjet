const express = require('express')
const authenticate = require('../middleware/authenticate')
const SalleController = require('../Controller/salle')
const router = express.Router();

router.get('/user/' ,SalleController.findAllClient);
router.get('/reserve/:id', SalleController.SelectDate);
router.get('/' ,SalleController.findAll);
router.get('/:id', SalleController.findOne);
router.post('/create', SalleController.create);
router.post('/:id',SalleController.update);
router.get('/delete/:id',SalleController.destroy);
module.exports = router