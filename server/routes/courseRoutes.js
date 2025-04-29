const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

// Protected routes
router.post('/:courseId/apply', authMiddleware.verifyToken, courseController.applyForCourse);
router.get('/user/applications', authMiddleware.verifyToken, courseController.getUserApplications);

// Admin routes
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, courseController.createCourse);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, courseController.updateCourse);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, courseController.deleteCourse);

// Для админ-панели
router.get('/applications', 
    authMiddleware.verifyToken, 
    authMiddleware.isAdmin, 
    courseController.getAllApplications
  );
  
  router.put('/applications/:id/status', 
    authMiddleware.verifyToken, 
    authMiddleware.isAdmin, 
    courseController.updateApplicationStatus
  );
  
module.exports = router;