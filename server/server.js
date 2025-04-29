require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'matematik_portal',
  password: process.env.DB_PASSWORD, // Укажите ваш пароль
  port: 5432,
});

// Регистрация пользователя
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка регистрации' });
  }
});

// Авторизация пользователя
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }
    
    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка авторизации' });
  }
});

// Отправка заявки
app.post('/api/applications', async (req, res) => {
  try {
    const { studentName, grade, parentName, phone, email, courseId } = req.body;
    const token = req.headers['x-access-token'];
    
    if (!token) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    
    const result = await pool.query(
      `INSERT INTO applications 
       (user_id, student_name, grade, parent_name, phone, email, course_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [userId, studentName, grade, parentName, phone, email, courseId]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при отправке заявки' });
  }
});

// Получение заявок (для админки)
app.get('/api/admin/applications', async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET);
    
    const result = await pool.query(
      'SELECT a.*, u.email as user_email FROM applications a JOIN users u ON a.user_id = u.id ORDER BY created_at DESC'
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении заявок' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
