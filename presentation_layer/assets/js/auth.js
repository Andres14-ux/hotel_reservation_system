// Al iniciar sesión
$.ajax({
    url: '/api/login', // Endpoint para la autenticación
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
        email: email,
        password: password
    }),
    success: function (response) {
        // Guardar el token recibido en el almacenamiento local
        localStorage.setItem('token', response.token);

        // Redirigir al usuario a la página de reservas del cliente
        window.location.href = 'cliente/reservas.html';
    },
    error: function (error) {
        // Mostrar un mensaje de error en caso de fallo
        alert('Error en el inicio de sesión: ' + error.responseJSON.message);
    }
});

$.ajax({
    url: '/api/reservas', // Endpoint para obtener las reservas
    method: 'GET', // Método HTTP para la solicitud
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token') // Token de autorización
    },
    success: function (data) {
        // Manejar la respuesta exitosa
        console.log("Reservas obtenidas:", data);

        // Ejemplo de procesamiento de datos
        data.forEach(function (reserva) {
            console.log("Reserva ID:", reserva.id);
        });

        // Aquí podrías actualizar el DOM con los datos obtenidos
    },
    error: function (error) {
        // Manejar errores
        console.error("Error al obtener reservas:", error);
        alert("No se pudo obtener las reservas. Por favor, verifica tu conexión o inicia sesión nuevamente.");
    }
});
