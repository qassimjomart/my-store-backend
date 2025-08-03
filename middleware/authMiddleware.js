// Файл: my-store-backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    
    // Проверяем, есть ли заголовок Authorization и начинается ли он с 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Получаем токен (без слова 'Bearer')
            token = req.headers.authorization.split(' ')[1];
            
            // Верифицируем токен
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Находим пользователя по ID из токена и добавляем его в объект запроса
            // Исключаем поле пароля из объекта пользователя
            req.user = await User.findById(decoded.id).select('-password');
            
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Не авторизован, токен недействителен' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Не авторизован, нет токена' });
    }
};

module.exports = { protect };