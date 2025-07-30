// Файл: my-store-backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

// Загружаем переменные из .env файла
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Разрешаем запросы с других доменов (с вашего фронтенда)
app.use(express.json()); // Позволяет серверу принимать JSON в теле запроса

// Используем маршруты для товаров
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 5000;

// Подключаемся к MongoDB и запускаем сервер
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected!');
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });
