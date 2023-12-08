
document.addEventListener('DOMContentLoaded', function () {
  const token = getCookie('token');

  if (!token) {
    window.location.href = 'http://localhost:3001/adm/usuario/login';
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