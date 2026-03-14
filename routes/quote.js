const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// Redirect GET to contact page
router.get('/', (req, res) => res.redirect('/contact#quote'));

router.post('/', quoteController.submitForm);

module.exports = router;