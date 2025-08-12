// Файл: /controllers/bannerController.js

const Banner = require('../models/bannerModel'); // Наша модель из Шага 1

// @desc    Получить все баннеры
// @route   GET /api/banners
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({}); // Найти все документы в коллекции Banner
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Создать новый баннер
// @route   POST /api/banners
const createBanner = async (req, res) => {
  try {
    // Данные приходят с фронтенда в req.body
    const { name, imageUrl, linkUrl, mainCategory } = req.body;

    const banner = new Banner({
      name,
      imageUrl,
      linkUrl,
      mainCategory,
    });

    const createdBanner = await banner.save(); // Сохраняем в базу данных
    res.status(201).json(createdBanner);
  } catch (error) {
    res.status(400).json({ message: 'Неверные данные для баннера' });
  }
};

// @desc    Обновить баннер
// @route   PUT /api/banners/:id
const updateBanner = async (req, res) => {
  try {
    const { name, imageUrl, linkUrl, mainCategory } = req.body;
    const banner = await Banner.findById(req.params.id); // Находим баннер по ID из URL

    if (banner) {
      banner.name = name || banner.name;
      banner.imageUrl = imageUrl || banner.imageUrl;
      banner.linkUrl = linkUrl || banner.linkUrl;
      banner.mainCategory = mainCategory || banner.mainCategory;

      const updatedBanner = await banner.save();
      res.json(updatedBanner);
    } else {
      res.status(404).json({ message: 'Баннер не найден' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при обновлении' });
  }
};

// @desc    Удалить баннер
// @route   DELETE /api/banners/:id
const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (banner) {
      await banner.deleteOne(); // Используем новый метод .deleteOne()
      res.json({ message: 'Баннер удален' });
    } else {
      res.status(404).json({ message: 'Баннер не найден' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};