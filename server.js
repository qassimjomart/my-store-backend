// Файл: my-store-backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Загружаем переменные из .env файла
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Разрешаем запросы с других доменов (с вашего фронтенда)
app.use(express.json()); // Позволяет серверу принимать JSON в теле запроса

// Основные маршруты
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Используем маршруты для товаров и пользователей
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Middleware для обработки ошибок
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

// Подключаемся к MongoDB и запускаем сервер
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected!');
        app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });