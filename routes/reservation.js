const express = require('express')
const authenticate = require('../middleware/authenticate')
const reservationController = require('../Controller/reservation')
const router = express.Router();

router.get('/',authenticate ,reservationController.findAll);
router.get('/:id',authenticate, reservationController.findOne);
router.get('/:id',authenticate, reservationController.findAllbyUser);
router.post('/',authenticate, reservationController.create);
router.patch('/:id', authenticate,reservationController.update);
router.delete('/:id', authenticate,reservationController.destroy);
module.exports = router