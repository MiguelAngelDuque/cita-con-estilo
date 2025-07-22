document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('auth-section');
  const registerSection = document.getElementById('register-section');
  const mainSection = document.getElementById('main-section');

  const showLogin = document.getElementById('show-login');
  const showRegister = document.getElementById('show-register');

  showLogin.addEventListener('click', () => {
    registerSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
  });

  showRegister.addEventListener('click', () => {
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
  });

  // Aquí conectaremos Firebase más adelante:
  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    alert(`Login con ${email} (aquí irá Firebase)`);
  });

  document.getElementById('register-btn').addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    alert(`Registro con ${email} (aquí irá Firebase)`);
  });

  document.getElementById('reserve-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const appointment = `${date} a las ${time} - ${name}`;
    const li = document.createElement('li');
    li.textContent = appointment;
    document.getElementById('appointments-list').appendChild(li);
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    alert("Cerrar sesión (aquí irá Firebase logout)");
  });
});
