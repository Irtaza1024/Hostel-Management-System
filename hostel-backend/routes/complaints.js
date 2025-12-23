const express = require('express');
const router = express.Router();
const controller = require('../controllers/complaintController');

// Get all complaints
router.get('/', controller.getAll);

// Create a complaint
router.post('/', controller.create);

// Delete a complaint by ID
router.delete('/:complaintID', controller.remove);

module.exports = router;
