// Файл: my-store-backend/controllers/userController.js

const asyncHandler = require('express-async-handler');
import User from '../models/User.js'; // Убедитесь, что путь к модели верный (может быть userModel.js)
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';



const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Аутентификация пользователя и получение токена
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Неверный email или пароль' });
    }
};

// @desc    Регистрация нового пользователя
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Неверные данные пользователя' });
    }
};

// @desc    Получение профиля пользователя
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'Пользователь не найден' });
    }
};


// @desc    Update user profile (name & email)
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // req.user._id приходит из вашего middleware 'protect'
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();


// Возвращаем обновленные данные, чтобы фронтенд мог их сразу отобразить
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id), // Отправляем тот же или новый токен
        });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
});



// @desc    Change user password
// @route   PUT /api/users/profile/password
// @access  Private
const changeUserPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    // Простая валидация на сервере
    if (!currentPassword || !newPassword) {
      res.status(400);
      throw new Error('Please provide current and new passwords');
    }

    // Находим пользователя по ID из токена
    const user = await User.findById(req.user._id);
     // Проверяем, совпадает ли введенный текущий пароль с паролем в БД
     if (user && (await user.matchPassword(currentPassword))) { // Предполагая, что в модели User.js есть метод matchPassword
        // Хешируем новый пароль перед сохранением
        user.password = newPassword; // Предполагая, что в модели User.js есть pre-save hook для хеширования
        
        await user.save();
        
        res.json({ message: 'Password updated successfully' });
    } else {
        res.status(401); // 401 Unauthorized - Не авторизован (неверный пароль)
        throw new Error('Invalid current password');
    }
});






module.exports = {
    loginUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    changeUserPassword
};

