// Referencias al DOM
const authContainer = document.getElementById('auth-container');
const appointmentContainer = document.getElementById('appointment-container');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');
const errorMessage = document.getElementById('error-message');
const appointmentMessage = document.getElementById('appointment-message');
const btnReserve = document.getElementById('btn-reserve');
const btnLogout = document.getElementById('btn-logout');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

// Registro
btnRegister.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  errorMessage.textContent = '';
  if (!email || !password) {
    errorMessage.textContent = 'Por favor, rellena ambos campos.';
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      errorMessage.textContent = '';
      appointmentMessage.textContent = '';
      emailInput.value = '';
      passwordInput.value = '';
      alert('Registro exitoso. Ya puedes reservar tu cita.');
    })
    .catch(err => {
      errorMessage.textContent = err.message;
    });
});

// Login
btnLogin.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  errorMessage.textContent = '';
  if (!email || !password) {
    errorMessage.textContent = 'Por favor, rellena ambos campos.';
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      errorMessage.textContent = '';
      appointmentMessage.textContent = '';
      emailInput.value = '';
      passwordInput.value = '';
    })
    .catch(err => {
      errorMessage.textContent = err.message;
    });
});

// Detectar estado de sesión
auth.onAuthStateChanged(user => {
  if (user) {
    authContainer.style.display = 'none';
    appointmentContainer.style.display = 'block';
  } else {
    authContainer.style.display = 'block';
    appointmentContainer.style.display = 'none';
  }
});

// Reservar cita
btnReserve.addEventListener('click', () => {
  const date = dateInput.value;
  const time = timeInput.value;
  const user = auth.currentUser;

  appointmentMessage.textContent = '';
  appointmentMessage.style.color = '';

  if (!date || !time) {
    appointmentMessage.textContent = 'Selecciona fecha y hora.';
    appointmentMessage.style.color = '#e74c3c';
    return;
  }

  db.collection('citas').add({
    uid: user.uid,
    email: user.email,
    fecha: date,
    hora: time,
    creado: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    appointmentMessage.textContent = 'Cita reservada con éxito.';
    appointmentMessage.style.color = '#27ae60';
    dateInput.value = '';
    timeInput.value = '';
  })
  .catch(err => {
    appointmentMessage.textContent = 'Error al reservar cita: ' + err.message;
    appointmentMessage.style.color = '#e74c3c';
  });
});

// Enviar email de confirmacion
emailjs.send("service_xxx", "template_xxx", {
  user_email: user.email,
  fecha: date,
  hora: time
})


// Logout
btnLogout.addEventListener('click', () => {
  auth.signOut();
});
