const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Get all staff with roles
router.get('/', staffController.getAllStaff);

// Create new staff member
router.post('/', staffController.createStaff);

// Delete staff member
router.delete('/:staffID', staffController.deleteStaff);

module.exports = router;
