const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

// Specific routes first
router.get('/no-violations', studentsController.getNoViolations);

// Get all students
router.get('/', studentsController.getAllStudents);

// Student by CMSID
router.get('/:cmsid', studentsController.getStudent);
router.get('/:cmsid/mess', studentsController.getMess);
router.get('/:cmsid/violations', studentsController.getViolations);
router.get('/:cmsid/complaints', studentsController.getComplaints);
router.get('/:cmsid/cleaningRecords', studentsController.getCleaningRecords);
router.get('/:cmsid/messRecords', studentsController.getMessRecords);
router.get('/:cmsid/messStatus', studentsController.getMessStatus);
router.get('/:cmsid/roommates', studentsController.getRoommates);

router.post('/', studentsController.create);
router.delete('/:CMSID', studentsController.remove);

module.exports = router;
