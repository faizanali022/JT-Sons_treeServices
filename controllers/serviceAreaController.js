// All service area pages use static content from EJS, no dynamic data needed.
// But you can pass any required variables like phone/email from .env

exports.index = (req, res) => {
    res.render('pages/service-areas', {
        title: 'Service Areas | JT & Sons Tree Service',
        description: 'Proudly serving Gold Beach, Brookings, Port Orford, and all of Curry County, Oregon.'
    });
};

exports.goldBeach = (req, res) => {
    res.render('service-areas/gold-beach', {
        title: 'Tree Service in Gold Beach, OR | JT & Sons',
        description: 'Professional tree removal, trimming, and fire reduction in Gold Beach, Oregon.'
    });
};

exports.brookingsIndex = (req, res) => {
    res.render('service-areas/brookings/index', {
        title: 'Tree Service in Brookings, OR | JT & Sons',
        description: 'Expert tree care services in Brookings, Oregon and surrounding areas.'
    });
};

exports.brookingsTreeRemoval = (req, res) => {
    res.render('service-areas/brookings/tree-removal', {
        title: 'Tree Removal in Brookings, OR | JT & Sons',
        description: 'Safe and professional tree removal services in Brookings, Oregon.'
    });
};

exports.brookingsTreeTrimming = (req, res) => {
    res.render('service-areas/brookings/tree-trimming', {
        title: 'Tree Trimming in Brookings, OR | JT & Sons',
        description: 'Professional tree trimming and pruning in Brookings, Oregon.'
    });
};

exports.brookingsStumpGrinding = (req, res) => {
    res.render('service-areas/brookings/stump-grinding', {
        title: 'Stump Grinding in Brookings, OR | JT & Sons',
        description: 'Complete stump removal services in Brookings, Oregon.'
    });
};

exports.brookingsFireReduction = (req, res) => {
    res.render('service-areas/brookings/fire-reduction', {
        title: 'Fire Reduction & View Clearing in Brookings, OR | JT & Sons',
        description: 'Defensible space and brush clearing services in Brookings, Oregon.'
    });
};

exports.brookingsCraneServices = (req, res) => {
    res.render('service-areas/brookings/crane-services', {
        title: 'Crane Tree Removal in Brookings, OR | JT & Sons',
        description: 'Large tree removal using crane assistance in Brookings, Oregon.'
    });
};

exports.pistolRiver = (req, res) => {
    res.render('service-areas/pistol-river', {
        title: 'Tree Service in Pistol River, OR | JT & Sons',
        description: 'Professional tree care in Pistol River, Oregon.'
    });
};

exports.ophir = (req, res) => {
    res.render('service-areas/ophir', {
        title: 'Tree Service in Ophir, OR | JT & Sons',
        description: 'Expert tree removal and trimming in Ophir, Oregon.'
    });
};

exports.agness = (req, res) => {
    res.render('service-areas/agness', {
        title: 'Tree Service in Agness, OR | JT & Sons',
        description: 'Reliable tree care services in Agness, Oregon.'
    });
};

exports.portOrford = (req, res) => {
    res.render('service-areas/port-orford', {
        title: 'Tree Service in Port Orford, OR | JT & Sons',
        description: 'Professional tree removal and emergency services in Port Orford, Oregon.'
    });
};

exports.bandon = (req, res) => {
    res.render('service-areas/bandon', {
        title: 'Tree Service in Bandon, OR | JT & Sons',
        description: 'Expert tree care in Bandon, Oregon.'
    });
};

exports.coosBay = (req, res) => {
    res.render('service-areas/coos-bay', {
        title: 'Tree Service in Coos Bay, OR | JT & Sons',
        description: 'Professional tree services in Coos Bay, Oregon.'
    });
};