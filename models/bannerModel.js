// Файл: /models/bannerModel.js

const mongoose = require('mongoose');

// Описываем схему данных для баннера
const bannerSchema = mongoose.Schema(
  {
    // Название для удобства в админ-панели
    name: {
      type: String,
      required: true,
    },
    // URL картинки баннера
    imageUrl: {
      type: String,
      required: true,
    },
    // Ссылка, куда ведет баннер
    linkUrl: {
      type: String,
      required: true,
    },
    // Главная категория, к которой привязан баннер ('women', 'men', etc.)
    mainCategory: {
      type: String,
      required: true,
    },
  },
  {
    // Автоматически добавлять поля createdAt и updatedAt
    timestamps: true,
  }
);

// Mongoose автоматически добавит уникальный ID (_id) для каждого баннера.

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;