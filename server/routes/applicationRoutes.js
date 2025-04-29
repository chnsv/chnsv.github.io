const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, applicationController.createApplication);
router.get('/my', authMiddleware, applicationController.getUserApplications);
router.get('/all', authMiddleware, applicationController.getAllApplications);

module.exports = router;
