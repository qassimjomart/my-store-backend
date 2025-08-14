import express from 'express';
const router = express.Router();
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from '../controllers/bannerController.js';

// /api/banners
router.route('/').get(getBanners).post(createBanner);

// /api/banners/:id
router.route('/:id').put(updateBanner).delete(deleteBanner);

export default router;
