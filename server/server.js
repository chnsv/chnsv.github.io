const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/AuthRoutes');
const courseRoutes = require('./routes/CourseRoutes');
const applicationRoutes = require('./routes/ApplicationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/applications', applicationRoutes);

// Синхронизация с БД и запуск сервера
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Сервер запущен на порту 3001');
  });
});
