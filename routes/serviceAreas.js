const express = require('express');
const router = express.Router();
const serviceAreaController = require('../controllers/serviceAreaController');

router.get('/', serviceAreaController.index);
router.get('/gold-beach', serviceAreaController.goldBeach);
router.get('/pistol-river', serviceAreaController.pistolRiver);
router.get('/ophir', serviceAreaController.ophir);
router.get('/agness', serviceAreaController.agness);
router.get('/port-orford', serviceAreaController.portOrford);
router.get('/bandon', serviceAreaController.bandon);
router.get('/coos-bay', serviceAreaController.coosBay);

// Brookings area (with sub-pages)
router.get('/brookings', serviceAreaController.brookingsIndex);
router.get('/brookings/tree-removal', serviceAreaController.brookingsTreeRemoval);
router.get('/brookings/tree-trimming', serviceAreaController.brookingsTreeTrimming);
router.get('/brookings/stump-grinding', serviceAreaController.brookingsStumpGrinding);
router.get('/brookings/fire-reduction', serviceAreaController.brookingsFireReduction);
router.get('/brookings/crane-services', serviceAreaController.brookingsCraneServices);

module.exports = router;