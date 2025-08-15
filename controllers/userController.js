// Файл: my-store-backend/controllers/userController.js

const User = require('../models/User.js');
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';



const User = require('../models/User.js');
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





module.exports = {
    loginUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    changeUserPassword
};







