const express = require('express');
const router = express.Router();
const controller = require('../controllers/billController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:billID', controller.remove);

module.exports = router;
