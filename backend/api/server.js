require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const appointmentRouter = require('./routes/appointmentRouter');
const slotRouter = require('./routes/slotRouter');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true  //use new server discovery and monitoring engine
})

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/appointments', appointmentRouter);
server.use('/slots', slotRouter);

server.get('/', (req, res) => {
  res.status(200).json('server is running');
})

module.exports = server;