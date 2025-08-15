// Файл: my-store-backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { 
    loginUser,
    registerUser,
    getUserProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile); // Этот маршрут защищен


module.exports = router;

