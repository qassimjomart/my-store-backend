// Файл: my-store-backend/routes/productRoutes.js

const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// @desc    Получить все товары
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ id: 1 }); // Сортируем по ID
        res.json(products);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: 'Server error while fetching products' });
    }
});

// @desc    Получить один товар по ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// --- Маршруты для будущей Админ-панели ---

// @desc    Создать новый товар
// @route   POST /api/products
// @access  Private/Admin (пока что Public для разработки)
router.post('/', async (req, res) => {
    try {
        // Находим товар с самым большим ID, чтобы сгенерировать следующий
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        const newProduct = new Product({
            ...req.body,
            id: newId,
        });

        const createdProduct = await newProduct.save();
        res.status(201).json(createdProduct);

    } catch (error) {
        console.error('API Error on product creation:', error);
        res.status(500).json({ message: 'Server error while creating product' });
    }
});


// @desc    Обновить товар
// @route   PUT /api/products/:id
// @access  Private/Admin (реализовано)
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });

        if (product) {
            // Обновляем каждое поле из тела запроса
            Object.assign(product, req.body);
            
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch(error) {
        console.error('API Error on product update:', error);
        res.status(500).json({ message: 'Server error while updating product' });
    }
});

// @desc    Удалить товар
// @route   DELETE /api/products/:id
// @access  Private/Admin (реализовано)
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.params.id });

        if (product) {
            res.json({ message: 'Product removed successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch(error) {
        console.error('API Error on product deletion:', error);
        res.status(500).json({ message: 'Server error while deleting product' });
    }
});


module.exports = router;