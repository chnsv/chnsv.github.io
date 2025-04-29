let currentUser = null;

async function login(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      currentUser = data.user;
      updateAuthUI();
      
      // Перенаправление для админа
      if (currentUser.role === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'account.html';
      }
    } else {
      showError(data.error);
    }
  } catch (error) {
    showError('Ошибка соединения');
  }
}

function logout() {
  localStorage.removeItem('token');
  currentUser = null;
  window.location.href = 'index.html';
}

function updateAuthUI() {
  const authSection = document.getElementById('auth-section');
  const accountLink = document.getElementById('account-link');
  
  if (currentUser) {
    authSection.innerHTML = `
      <span>Привет, ${currentUser.name}</span>
      <button onclick="logout()">Выйти</button>
    `;
    
    if (accountLink) {
      accountLink.href = currentUser.role === 'admin' ? 'admin.html' : 'account.html';
      accountLink.textContent = currentUser.role === 'admin' ? 'Админ-панель' : 'Личный кабинет';
    }
  }
}

// Проверка авторизации при загрузке страницы
async function checkAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'x-access-token': token
        }
      });
      
      if (response.ok) {
        currentUser = await response.json();
        updateAuthUI();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', checkAuth);