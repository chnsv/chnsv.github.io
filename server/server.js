const express = require('express');
const helmet = require('helmet'); // Добавляем пакет helmet для безопасности

const app = express();

// Добавляем security headers
app.use(helmet()); // Основные security headers

// Дополнительные кастомные заголовки
app.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, max-age=0', // или 'public, max-age=300' для кэширования
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Content-Security-Policy': "default-src 'self'", // Настройте по своему усмотрению
    'Referrer-Policy': 'no-referrer'
  });
  next();
});
