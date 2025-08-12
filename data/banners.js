// Этот массив будет использоваться для заполнения базы данных
const banners = [
    {
      name: 'Женская весенняя коллекция',
      imageUrl: 'https://kimex.kz/upload/iblock/eed/1noj4oyc9uf327vi77ebou243njym84k.jpg',
      linkUrl: '/category/women',
      mainCategory: 'women',
    },
    {
      name: 'Скидки на мужскую обувь',
      imageUrl: 'https://kimex.kz/upload/iblock/3e6/qhkh5d3eozol3jsliet18xoli8fuqwsf.jpg',
      linkUrl: '/catalog?gender=men&category=footwear&tag=sale',
      mainCategory: 'men',
    },
    {
      name: 'Все для детей',
      imageUrl: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      linkUrl: '/category/kids',
      mainCategory: 'kids',
    },
  ];
  
  // Экспортируем массив, чтобы его можно было использовать в другом файле
  module.exports = banners;