const servicesData = require('../data/services.json');
const areasData = require('../data/serviceAreas.json');

exports.home = (req, res) => {
    res.render('pages/index', {
        title: 'Tree Service Gold Beach OR | JT & Sons Tree Service LLC',
        description: 'JT & Sons Tree Service LLC provides professional tree trimming, hazardous tree removal, land clearing, brush chipping, and fire reduction services in Gold Beach, OR and Curry County.',
        services: servicesData.slice(0, 3),
        areas: areasData.slice(0, 4)
    });
};

exports.about = (req, res) => {
    res.render('pages/about', {
        title: 'About JT & Sons | Family Tree Service',
        description: 'Learn about our family-owned tree service with 30+ years of experience on the Southern Oregon Coast.'
    });
};

exports.gallery = (req, res) => {
    res.render('pages/gallery', {
        title: 'Our Work Gallery | JT & Sons Tree Service',
        description: 'See examples of our tree removal, trimming, and land clearing projects.'
    });
};