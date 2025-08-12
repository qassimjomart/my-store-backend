// Файл: /routes/bannerRoutes.js

const express = require('express');
const router = express.Router();

// Импортируем функции-контроллеры, которые мы создадим на следующем шаге
const {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} = require('../controllers/bannerController');

// Привязываем функции к маршрутам
router.route('/').get(getBanners).post(createBanner);
router.route('/:id').put(updateBanner).delete(deleteBanner);

module.exports = router;