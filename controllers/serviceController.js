const services = require('../data/services.json');

exports.index = (req, res) => {
    res.render('pages/services', {
        title: 'Professional Tree Services | JT & Sons',
        description: 'Explore our tree trimming, removal, stump grinding, fire reduction, and emergency services.',
        services
    });
};

exports.treeRemoval = (req, res) => {
    const service = services.find(s => s.slug === 'tree-removal');
    res.render('services/tree-removal', {
        title: 'Tree Removal Services Gold Beach OR | JT & Sons',
        description: 'Safe and professional tree removal on the Southern Oregon Coast.',
        service
    });
};

exports.treeTrimming = (req, res) => {
    const service = services.find(s => s.slug === 'tree-trimming');
    res.render('services/tree-trimming', {
        title: 'Tree Trimming & Pruning Gold Beach OR | JT & Sons',
        description: 'Expert tree trimming to keep your trees healthy and safe.',
        service
    });
};

exports.stumpGrinding = (req, res) => {
    const service = services.find(s => s.slug === 'stump-grinding');
    res.render('services/stump-grinding', {
        title: 'Stump Grinding Gold Beach OR | JT & Sons',
        description: 'Remove unsightly stumps with professional stump grinding.',
        service
    });
};

exports.fireReduction = (req, res) => {
    const service = services.find(s => s.slug === 'fire-reduction');
    res.render('services/fire-reduction', {
        title: 'Fire Reduction & View Clearing | JT & Sons',
        description: 'Defensible space and brush clearing for wildfire prevention.',
        service
    });
};

exports.emergencyTree = (req, res) => {
    const service = services.find(s => s.slug === 'emergency-tree');
    res.render('services/emergency-tree', {
        title: 'Emergency Tree Service Gold Beach OR | JT & Sons',
        description: '24/7 emergency tree removal after storms.',
        service
    });
};

exports.craneServices = (req, res) => {
    const service = services.find(s => s.slug === 'crane-services');
    res.render('services/crane-services', {
        title: 'Crane Tree Removal Gold Beach OR | JT & Sons',
        description: 'Large tree removal using crane assistance for safety.',
        service
    });
};