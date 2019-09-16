const express = require('express');

const router = express.Router();

const appointmentController = require('../../data/controllers/appointmentController');

//get all appointments
router.get('/', appointmentController.findAllAppointments);

//add appointment
router.post('/', appointmentController.addAppointment);

//update appointment
router.put('/:id', appointmentController.editAppointment);

//delete appointment
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;