const slotModel = require('../models/slotModel');

module.exports = {
  findAllSlots,
  findSlotById,
  addSlot,
  updateSlot,
  deleteSlot
}

function findAllSlots(req, res) {
  const date = req.query.date;
  
  if (date) {
    slotModel.find({ slotDate: date }, (error, data) => {
      if (error) {
        res.status(500).json({ 
          message: 'testing',
          error: error
        });
      } else if (data.length === 0) {
        res.status(404).json('no slot found on this date')
      } else {
        res.status(200).json(data);   
      }
    })
  } else {
    slotModel.find((error, data) => {
      if (error) {
        res.status(500).json({ 
          message: 'error fetching slots',
          error: error
        });
      } else {
        res.status(200).json(data);     
      }
    })
  }
}

function findSlotById(req, res) {
  const id = req.params.id;

  slotModel.findOne({ _id: id}, (error, data) => {
    if (error) {
      res.status(500).json({ 
        message: 'error fetching slot',
        error: error
      });
    } else if (!data) {
      res.status(404).json('no slot of such id exists')
    } else {
      res.status(200).json(data);    
    }
  })
}

function addSlot(req, res) {
  const input = req.body;
  const newSlot = new slotModel(input);

  newSlot.save((error, data) => {
    if (error) {
      res.status(500).json({
        message: 'error adding new slot',
        error: error
      })
    } else {
      res.status(201).json(data);
    }
  })
}

function updateSlot(req, res) {
  const id = req.params.id;
  const input = req.body;

  slotModel.findOneAndUpdate({ _id: id }, input, (error, data) => {
    if (error) {
      res.status(500).json({ 
        message: 'error deleting slot',
        error: error
      });
    } else if (!data) {
      res.status(404).json('no slot of such id exists')
    } else {
      res.status(200).json({ removed: data });    
    }
  })

}

function deleteSlot(req, res) {
  const id = req.params.id;

  slotModel.findOneAndRemove({ _id: id }, (error, data) => {
    if (error) {
      res.status(500).json({ 
        message: 'error deleting slot',
        error: error
      });
    } else if (!data) {
      res.status(404).json('no slot of such id exists')
    } else {
      res.status(200).json({ removed: data });    
    }
  })
}