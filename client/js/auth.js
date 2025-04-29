let currentUser = null;

function showAuthModal() {
  document.getElementById('authModal').style.display = 'block';
}

function hideAuthModal() {
  document.getElementById('authModal').style.display = 'none';
}

function showRegisterForm() {
  document.getElementById('loginFormContainer').style.display = 'none';
  document.getElementById('registerFormContainer').style.display = 'block';
}

function showLoginForm() {
  document.getElementById('registerFormContainer').style.display = 'none';
  document.getElementById('loginFormContainer').style.display = 'block';
}

// Регистрация пользователя
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  
  if (password !== confirmPassword) {
    alert('Пароли не совпадают');
    return;
  }
  
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      currentUser = { email };
      
      document.getElementById('authButton').style.display = 'none';
      document.getElementById('accountLink').style.display = 'inline';
      document.getElementById('accountLink').textContent = email;
      
      hideAuthModal();
      alert('Регистрация успешна!');
    } else {
      const error = await response.json();
      alert(error.error || 'Ошибка регистрации');
    }
  } catch (err) {
    alert('Ошибка соединения с сервером');
  }
});

// Авторизация пользователя
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      currentUser = data.user;
      
      document.getElementById('authButton').style.display = 'none';
      document.getElementById('accountLink').style.display = 'inline';
      document.getElementById('accountLink').textContent = currentUser.email;
      
      hideAuthModal();
    } else {
      const error = await response.json();
      alert(error.error || 'Ошибка авторизации');
    }
  } catch (err) {
    alert('Ошибка соединения с сервером');
  }
});

// Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    // Здесь можно добавить запрос для проверки токена
    document.getElementById('authButton').style.display = 'none';
    document.getElementById('accountLink').style.display = 'inline';
  }
});
