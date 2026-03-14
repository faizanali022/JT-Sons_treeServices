const Quote = require('../models/Quote');

exports.submitForm = async (req, res) => {
    const { name, email, phone, serviceType, preferredDate, address, message } = req.body;
    if (!name || !email || !serviceType) {
        return res.render('pages/contact', { // render contact page with error
            title: 'Contact Us',
            quoteError: 'Please fill in required fields for quote.',
            quoteData: req.body,
            // preserve contact form data if any? Not needed.
        });
    }
    try {
        await Quote.create({ name, email, phone, serviceType, preferredDate, address, message });
        res.render('pages/contact', {
            title: 'Contact Us',
            quoteSuccess: 'Thank you! Your quote request has been submitted. We will contact you shortly.'
        });
    } catch (err) {
        console.error(err);
        res.render('pages/contact', {
            title: 'Contact Us',
            quoteError: 'An error occurred. Please try again later.',
            quoteData: req.body
        });
    }
};