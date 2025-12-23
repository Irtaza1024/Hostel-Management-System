const express = require('express');
const router = express.Router();
const controller = require('../controllers/messController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:recordID', controller.remove);

module.exports = router;
