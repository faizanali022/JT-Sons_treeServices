const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.showForm);
router.post('/', contactController.submitForm);

module.exports = router;