const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.showForm);
router.post('/', bookingController.submitForm);

module.exports = router;