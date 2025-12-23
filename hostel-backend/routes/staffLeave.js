const express = require('express');
const router = express.Router();
const staffLeaveController = require('../controllers/staffLeaveController');

// Get all leave records
router.get('/', staffLeaveController.getAllLeaves);

// Create new leave
router.post('/', staffLeaveController.createLeave);

// Delete leave record
router.delete('/:recordID', staffLeaveController.deleteLeave);

module.exports = router;
