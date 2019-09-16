module.exports = {
  validateInput
}

function validateInput(req, res, next) {
  const input = req.body;

  if (!input.email || !input.firstName || !input.lastName || !input.slotTime || !input.slotDate) {
    res.status(400).json('missing required fields');
  } else {
    next();
  }
}