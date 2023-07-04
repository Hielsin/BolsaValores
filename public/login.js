document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
  
    // Obtener los valores del formulario
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Enviar los datos al backend para el procesamiento
    // Aquí debes realizar una petición AJAX o utilizar alguna librería para hacer la solicitud al backend y autenticar al usuario
  
    // Por simplicidad, simplemente mostraremos los datos en la consola
    console.log("Nombre de usuario: " + username);
    console.log("Contraseña: " + password);
  
    // Puedes redirigir al usuario a otra página después de iniciar sesión exitosamente
    // window.location.href = "dashboard.html";
  });
  