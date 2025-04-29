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
      hideAuthModal();
    } else {
      alert(data.error || 'Ошибка авторизации');
    }
  } catch (error) {
    alert('Ошибка соединения с сервером');
  }
}

function logout() {
  localStorage.removeItem('token');
  currentUser = null;
  updateAuthUI();
  window.location.href = 'index.html';
}

function updateAuthUI() {
  const authButton = document.getElementById('authButton');
  const accountLink = document.getElementById('accountLink');
  
  if (currentUser) {
    authButton.style.display = 'none';
    accountLink.style.display = 'inline-block';
    accountLink.textContent = currentUser.role === 'admin' ? 'Админ-панель' : 'Личный кабинет';
    accountLink.href = currentUser.role === 'admin' ? 'admin.html' : 'account.html';
  } else {
    authButton.style.display = 'inline-block';
    accountLink.style.display = 'none';
  }
}

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

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  
  // Обработчик формы входа
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    await login(email, password);
  });
});

function showAuthModal() {
  document.getElementById('authModal').style.display = 'block';
}

function hideAuthModal() {
  document.getElementById('authModal').style.display = 'none';
}
