document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioContacto');
    const errorNombre = document.getElementById('errorNombre');
    const errorApellido = document.getElementById('errorApellido');
    const errorEmail = document.getElementById('errorEmail');
    const errorMensaje = document.getElementById('errorMensaje');

    function crearMensajeExito() {
        let contenedor = document.querySelector('.success-message');
        if (!contenedor) {
            contenedor = document.createElement('div');
            contenedor.className = 'success-message';
            form.parentNode.insertBefore(contenedor, form);
        }
        return contenedor;
    }

    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
    }

    function mostrarError(input, mensaje, elementoError) {
        elementoError.textContent = mensaje;
        input.classList.add('invalid');
    }

    function limpiarError(input, elementoError) {
        elementoError.textContent = '';
        input.classList.remove('invalid');
    }

    function limpiarMensajes() {
        limpiarError(form.nombre, errorNombre);
        limpiarError(form.apellido, errorApellido);
        limpiarError(form.email, errorEmail);
        limpiarError(form.mensaje, errorMensaje);

        const mensajeExito = document.querySelector('.success-message');
        if (mensajeExito) {
            mensajeExito.classList.remove('visible');
            mensajeExito.textContent = '';
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        limpiarMensajes();

        let valido = true;
        const nombre = form.nombre.value.trim();
        const apellido = form.apellido.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();

        if (nombre.length < 2) {
            mostrarError(form.nombre, 'El nombre debe tener al menos 2 caracteres.', errorNombre);
            valido = false;
        }

        if (apellido.length < 2) {
            mostrarError(form.apellido, 'El apellido debe tener al menos 2 caracteres.', errorApellido);
            valido = false;
        }

        if (!validarEmail(email)) {
            mostrarError(form.email, 'Por favor ingresa un correo electrónico válido.', errorEmail);
            valido = false;
        }

        if (mensaje.length < 5) {
            mostrarError(form.mensaje, 'El mensaje debe tener al menos 5 caracteres.', errorMensaje);
            valido = false;
        }

        if (!valido) {
            return;
        }

        // Redirigir a thx.html
        window.location.href = 'thx.html';
    });

    form.addEventListener('input', function (event) {
        const elemento = event.target;
        if (elemento === form.nombre) limpiarError(form.nombre, errorNombre);
        if (elemento === form.apellido) limpiarError(form.apellido, errorApellido);
        if (elemento === form.email) limpiarError(form.email, errorEmail);
        if (elemento === form.mensaje) limpiarError(form.mensaje, errorMensaje);
    });
});