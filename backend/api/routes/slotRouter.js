const express = require('express');

const router = express.Router();

const slotController = require('../../data/controllers/slotController');

//get all slots
router.get('/', slotController.findAllSlots);

//get slot by id
//router.get('/', slotController.findSlotsByDate);

router.get('/:id', slotController.findSlotById);

module.exports = router;