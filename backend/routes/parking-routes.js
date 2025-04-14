const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

router.post('/entry', parkingController.registerEntry);
router.post('/exit/:license_plate', parkingController.registerExit);
router.get('/report', parkingController.getReport);

module.exports = router;
