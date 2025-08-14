// Файл: my-store-backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { 
    loginUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    changeUserPassword
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile); // Этот маршрут защищен


// Роут для обновления данных профиля (имя, email)
// GET для получения профиля у вас, вероятно, уже есть. Добавляем PUT.
router.route('/profile').put(protect, updateUserProfile); // .get(protect, getUserProfile)

// Роут для смены пароля
router.route('/profile/password').put(protect, changeUserPassword);


module.exports = router;
