// Añade un event listener al formulario para el evento 'submit'
document.getElementById('registration-form').addEventListener('submit', function(event) {
    // Previene el envío por defecto del formulario
    event.preventDefault();
  
    // Variable para controlar la validez del formulario
    let isValid = true;
  
    // Validación del campo de nombre
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (nameInput.value.trim() === '') {
      // Si el campo está vacío, muestra un mensaje de error
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    } else {
      // Si el campo no está vacío, borra cualquier mensaje de error previo
      nameError.textContent = '';
    }
  
    // Validación del campo de email
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    // Expresión regular para validar el formato del email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailInput.value.trim() === '') {
      // Si el campo está vacío, muestra un mensaje de error
      emailError.textContent = 'Please enter your email.';
      isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      // Si el email no tiene un formato válido, muestra un mensaje de error
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    } else {
      // Si el email es válido, borra cualquier mensaje de error previo
      emailError.textContent = '';
    }
  
    // Validación del campo de contraseña
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    if (passwordInput.value.trim() === '') {
      // Si el campo está vacío, muestra un mensaje de error
      passwordError.textContent = 'Please enter a password.';
      isValid = false;
    } else {
      // Si el campo no está vacío, borra cualquier mensaje de error previo
      passwordError.textContent = '';
    }
  
    // Si todos los campos son válidos
    if (isValid) {
      // Envía el formulario
      event.target.submit();
  
      // Muestra una alerta de éxito
      alert("¡Inicio de sesión exitoso! Actualmente estamos trabajando en la creación de la aplicación. Gracias por su paciencia.");
    }
  });