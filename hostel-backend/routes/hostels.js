const express = require('express');
const router = express.Router();
const hostelsController = require('../controllers/hostelsController');

// Get all hostels
router.get('/', hostelsController.getAllHostels);

// Get a single hostel
router.get('/:hosid', hostelsController.getHostel);

// Hostels reports
router.get('/:hosid/unpaidmess', hostelsController.getUnpaidMess);
router.get('/:hosid/pendingcleaning', hostelsController.getPendingCleaning);
router.get('/:hosid/students', hostelsController.getStudentsOfHostel);
router.get('/:hosid/violations', hostelsController.getViolationsOfHostel);
router.get('/:hosid/complaints', hostelsController.getComplaintsOfHostel);

router.post('/', hostelsController.create);
router.delete('/:hosid', hostelsController.remove);

module.exports = router;
