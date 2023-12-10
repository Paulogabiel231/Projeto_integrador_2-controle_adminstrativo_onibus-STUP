
document.addEventListener('DOMContentLoaded', function () {
  const token = getCookie('token');
    if (!token) {
        window.location.href = 'http://localhost:3001/login';
    }
});

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

const decodeToken = (token) => {
  try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return payload;
  } catch (error) {
      throw Error('Token inválido.');
  }
}