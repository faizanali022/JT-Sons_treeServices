const Contact = require('../models/Contact');

exports.showForm = (req, res) => {
    res.render('pages/contact', {
        title: 'Contact Us | JT & Sons Tree Service',
        description: 'Get a free estimate for tree services in Gold Beach and Curry County.'
    });
};

exports.submitForm = async (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
        return res.render('pages/contact', {
            title: 'Contact Us',
            error: 'Please fill in all required fields.'
        });
    }
    try {
        await Contact.create({ name, email, phone, message });
        res.render('pages/contact', {
            title: 'Contact Us',
            success: 'Thank you! Your message has been sent. We will get back to you soon.'
        });
    } catch (err) {
        console.error(err);
        res.render('pages/contact', {
            title: 'Contact Us',
            error: 'An error occurred. Please try again later.'
        });
    }
};