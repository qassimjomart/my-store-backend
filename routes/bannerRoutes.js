import express from 'express';
const router = express.Router();
export { getBanners, createBanner, updateBanner, deleteBanner };

// /api/banners
router.route('/').get(getBanners).post(createBanner);

// /api/banners/:id
router.route('/:id').put(updateBanner).delete(deleteBanner);

export default router;

