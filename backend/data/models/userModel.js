const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  password: { 
    type: String, 
    require: true 
  },
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'appointment'
  }]
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;