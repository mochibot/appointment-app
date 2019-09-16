const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  email: { 
    type: String, 
    require: true 
  },
  firstName: { 
    type: String, 
    require: true 
  },
  lastName: { 
    type: String, 
    require: true 
  },
  slot: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'slot'
  }
}, { versionKey: false })

const appointmentModel = mongoose.model('appointment', appointmentSchema);

module.exports = appointmentModel;