const express = require('express')
const authenticate = require('../middleware/authenticate')
const reservationController = require('../Controller/reservation')
const router = express.Router();

router.get('/' ,reservationController.findAll);
router.get('/:id', reservationController.findOne);
router.get('/user/:id', reservationController.findAllbyUser);
router.post('/:salleId/:clientId', reservationController.create);
router.patch('/:id',reservationController.update);
router.get('/delete/:id',reservationController.destroy);
module.exports = router