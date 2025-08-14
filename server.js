// Файл: my-store-backend/server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import bannerRoutes from './routes/bannerRoutes.js';

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

// Используем маршруты для товаров, баннеров и пользователей
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/banners', bannerRoutes); 


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
