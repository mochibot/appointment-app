const express = require('express');

const router = express.Router();

const appointmentController = require('../../data/controllers/appointmentController');
const middlewares = require('../../middlewares');

//get all appointments
router.get('/', appointmentController.findAllAppointments);

//add appointment
router.post('/', middlewares.validateInput, middlewares.validateSlot, appointmentController.addAppointment);

//update appointment
router.put('/:id', middlewares.validateInput, middlewares.validateSlot, appointmentController.editAppointment);

//delete appointment
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;