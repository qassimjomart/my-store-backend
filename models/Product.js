// Файл: my-store-backend/models/Product.js

const mongoose = require('mongoose');

// Эта схема должна соответствовать интерфейсу Product в types.ts на фронтенде
const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true, index: true },
    name: {
        ru: { type: String, required: true },
        kk: { type: String, required: true }
    },
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    images: [{ type: String }],
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    availability: { type: String, required: true, enum: ['in-stock', 'on-order'] },
    stockCount: { type: Number },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'unisex'] },
    description: {
        ru: { type: String, required: true },
        kk: { type: String, required: true }
    },
    specs: {
        type: Map,
        of: {
            ru: String,
            kk: String
        }
    },
    isNewArrival: { type: Boolean, required: true },
    isBestSeller: { type: Boolean, required: true },
    dateAdded: { type: String, required: true },
    colors: [{
        ru: String,
        kk: String
    }],
    sizes: [{ type: String }]
}, {
    timestamps: true // Автоматически добавляет поля createdAt и updatedAt
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
