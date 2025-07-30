// Файл: my-store-backend/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products.js');
const Product = require('./models/Product.js');

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Очищаем коллекцию перед загрузкой
    await Product.deleteMany();

    // Вставляем все товары из нашего файла
    await Product.insertMany(products);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

// Запускаем функцию импорта
importData();
