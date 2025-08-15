const Banner = require('../models/bannerModel.js');

// @desc    Получить все баннеры
// @route   GET /api/banners
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({});
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Создать новый баннер
// @route   POST /api/banners
const createBanner = async (req, res) => {
  try {
    const { name, imageUrl, linkUrl, mainCategory } = req.body;

    if (!name || !imageUrl || !linkUrl || !mainCategory) {
        return res.status(400).json({ message: 'Please provide all required fields for the banner.' });
    }

    const banner = new Banner({
      name,
      imageUrl,
      linkUrl,
      mainCategory,
    });

    const createdBanner = await banner.save();
    res.status(201).json(createdBanner);
  } catch (error) {
    res.status(400).json({ message: 'Invalid banner data', error: error.message });
  }
};

// @desc    Обновить баннер
// @route   PUT /api/banners/:id
const updateBanner = async (req, res) => {
  try {
    const { name, imageUrl, linkUrl, mainCategory } = req.body;
    const banner = await Banner.findById(req.params.id);

    if (banner) {
      banner.name = name || banner.name;
      banner.imageUrl = imageUrl || banner.imageUrl;
      banner.linkUrl = linkUrl || banner.linkUrl;
      banner.mainCategory = mainCategory || banner.mainCategory;

      const updatedBanner = await banner.save();
      res.json(updatedBanner);
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating banner', error: error.message });
  }
};

// @desc    Удалить баннер
// @route   DELETE /api/banners/:id
const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (banner) {
      await banner.deleteOne(); // Mongoose 7+ uses deleteOne()
      res.json({ message: 'Banner removed' });
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};


