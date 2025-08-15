const express = require('express');
const router = express.Router();
const {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} = require('../controllers/bannerController.js');

// /api/banners
router.route('/').get(getBanners).post(createBanner);

// /api/banners/:id
router.route('/:id').put(updateBanner).delete(deleteBanner);

module.exports = router;


