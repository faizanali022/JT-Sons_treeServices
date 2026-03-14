const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.index);
router.get('/tree-removal', serviceController.treeRemoval);
router.get('/tree-trimming', serviceController.treeTrimming);
router.get('/stump-grinding', serviceController.stumpGrinding);
router.get('/fire-reduction', serviceController.fireReduction);
router.get('/emergency-tree', serviceController.emergencyTree);
router.get('/crane-services', serviceController.craneServices);

module.exports = router;