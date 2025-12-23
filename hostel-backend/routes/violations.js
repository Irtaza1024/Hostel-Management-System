const express = require('express');
const router = express.Router();
const controller = require('../controllers/violationController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:ViolationID', controller.remove);

module.exports = router;
