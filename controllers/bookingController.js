const Booking = require('../models/Booking');

exports.showForm = (req, res) => {
    res.render('pages/booking', {
        title: 'Book a Consultation',
        description: 'Schedule a free consultation with our tree care experts.'
    });
};

exports.submitForm = async (req, res) => {
    const { name, email, phone, address, preferredDate, serviceType, message } = req.body;
    if (!name || !email || !phone || !serviceType) {
        return res.render('pages/booking', {
            title: 'Book a Consultation',
            error: 'Please fill in all required fields.',
            bookingData: req.body
        });
    }
    try {
        await Booking.create({ name, email, phone, address, preferredDate, serviceType, message });
        res.render('pages/booking', {
            title: 'Book a Consultation',
            success: 'Thank you! Your booking request has been submitted. We will confirm shortly.'
        });
    } catch (err) {
        console.error(err);
        res.render('pages/booking', {
            title: 'Book a Consultation',
            error: 'An error occurred. Please try again later.',
            bookingData: req.body
        });
    }
};