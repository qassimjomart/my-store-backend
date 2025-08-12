// Файл: my-store-backend/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products.js');
const Product = require('./models/Product.js');
const Banner = require('./models/bannerModel.js'); 
const banners = require('./data/banners.js'); 


dotenv.config();


const importData = async () => {
  try {
    // Очистка старых данных
    await Product.deleteMany();
    await User.deleteMany();
    await Banner.deleteMany(); // <-- ДОБАВЬТЕ ОЧИСТКУ БАННЕРОВ

    // Загрузка пользователей
    await User.insertMany(users);
    
    // Загрузка товаров
    await Product.insertMany(products);

    // --- 2. ДОБАВЬТЕ ЗАГРУЗКУ БАННЕРОВ ---
    await Banner.insertMany(banners); // <-- ДОБАВЬТЕ ЭТУ СТРОКУ

    console.log('Данные успешно импортированы (Пользователи, Товары, Баннеры)!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Banner.deleteMany(); // <-- ДОБАВЬТЕ ОЧИСТКУ БАННЕРОВ И ЗДЕСЬ

    console.log('Данные успешно удалены!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Логика запуска скрипта
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}



// Запускаем функцию импорта
importData();
