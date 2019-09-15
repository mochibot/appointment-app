const moment = require('moment');

const appointmentModel = require('../models/appointmentModel');
const slotModel = require('../models/slotModel');

module.exports = {
  findAllAppointments,
  addAppointment,
  editAppointment,
  deleteAppointment
}

function findAllAppointments(req, res) {
  appointmentModel.find((error, data) => {
    if (error) {
      res.status(500).json({ 
        message: 'error fetching appointments',
        error: error
      });
    } else {
      res.status(200).json(data);   
    }
  })
}

function addAppointment (req, res) {
  const input = req.body;

  const newSlot = new slotModel({
    slotTime: input.slotTime,
    slotDate: moment(input.slotDate).format('MM-DD-YYYY')
  })

  newSlot.save();

  const newAppointment = new appointmentModel({
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    slots: newSlot._id
  })

  newAppointment.save((error, data) => {
    if (error) {
      res.status(500).json({ 
        message: 'error creating appointment',
        error: error
      });
    } else {
      res.status(201).json(data);
    }
  })
}

function editAppointment(req, res) {
  const id = req.params.id;
  const input = req.body;

  appointmentModel.findOne({ _id: id}, (error, data) => {
    if (error) {
      res.status(500).json({ 
        message: 'error fetching appointment',
        error: error
      });
    } else if (!data) {
      res.status(404).json({ 
        message: 'no appointment of such id exists',
      });
    }

    const updatedAppointment = data;
    updatedAppointment.email = input.email;
    updatedAppointment.firstName = input.firstName;
    updatedAppointment.lastName = input.lastName;
    updatedAppointment.slots = input.slots;

    updatedAppointment.save((error1, data1) => {
      if (error1) {
        res.status(500).json({ 
          message: 'error updating appointment',
          error: error1
        });
      } else {
        res.status(201).json(data1);
      }
    })
  })
}

function deleteAppointment(req, res) {
  const id = req.params.id;

  appointmentModel.findOneAndRemove({ _id: id }, (error, data) => {
    if (error) {
      res.status(500).json({ 
        message: 'error deleting appointment',
        error: error
      });
    } else if (!data) {
      res.status(404).json('no appointment of such id exists')
    } else {
      res.status(200).json({ removed: data });    
    }
  })
}