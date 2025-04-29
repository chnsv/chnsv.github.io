// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/AuthRoutes'));

// Подключение к БД и запуск сервера
sequelize.sync()
  .then(() => {
    app.listen(3001, () => {
      console.log('Сервер запущен на порту 3001');
    });
  })
  .catch(err => {
    console.error('Ошибка подключения к БД:', err);
  });
