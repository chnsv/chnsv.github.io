const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  userController.getAllUsers
);

router.delete('/:id', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  userController.deleteUser
);

router.put('/:id/role', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  userController.changeUserRole
);

module.exports = router;