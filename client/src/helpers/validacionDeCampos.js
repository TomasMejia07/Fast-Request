export const validacionDeCampos = (name, value) => {
    let errores = '';

    if (value.trim() === '') {
        return errores
    }

    if (name === 'usuario') {
        const partes = value.split('@');
        const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

        if (!value.includes('@')) {
            errores = 'El correo debe contener un símbolo "@"'
        } else if (partes.length !== 2 || partes[0].trim() === '') {
            errores = 'El correo debe tener un nombre de usuario antes del "@"'
        } else if (partes.length < 2) {
            errores = 'El correo debe contener un símbolo "@" y un dominio después';
        } else if (partes[1].trim() === '') {
            errores = 'El correo debe tener un dominio después del "@"';
        } else if (!regex.test(value)) {
            errores = 'El correo debe tener un dominio válido con una extensión como .com, etc.'
        } else {
            errores = ''
        }
    }

    // if (name === 'password') {
    //     if (value.length < 8 || value.length > 15) {
    //         errores = 'La contraseña debe tener entre 8 y 15 caracteres'
    //     } else if (!/[A-Z]/.test(value)) {
    //         errores = 'La contraseña debe incluir al menos una letra mayúscula'
    //     } else if (!/[a-z]/.test(value)) {
    //         errores = 'La contraseña debe incluir al menos una letra minúscula'
    //     } else if (!/\d/.test(value)) {
    //         errores = 'La contraseña debe incluir al menos un número'
    //     } else if (!/[!@#$%^&*]/.test(value)) {
    //         errores = 'La contraseña debe incluir un carácter especial (!@#$%^&*)'
    //     } else {
    //         errores = ''
    //     }
    // }


    // Validaciones para en componente HacerPedido.

    if (name === 'nombreCliente' || name === 'tipoProducto') {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/
        const trimmed = value.trim();

        if (trimmed === '') {
            errores = 'Este campo no puede estar vacío.'
        } else if (value !== trimmed) {
            errores = 'No debe haber espacios al inicio o al final.';
        } else if (trimmed.length < 3) {
            errores = 'este valor es demasiado corto.'
        } else if (trimmed.length > 50) {
            errores = 'este valor es demasiado largo.';
        } else if (!regex.test(trimmed)) {
            errores = 'Este campo solo debe contener letras y espacios.'
        } else if (/\s{2,}/.test(trimmed)) {
            errores = 'No se permiten espacios múltiples entre palabras.';
        } else {
            errores = ''
        }
    }

    if (name === 'cantidadProducto') {
        const regex = /^[0-9]+$/
        const trimmed = value.trim()

        if (trimmed === '') {
            errores = 'Este campo no puede estar vacío.'
        } else if (value !== trimmed) {
            errores = 'No debe haber espacios al inicio o al final.';
        } else if (parseInt(trimmed) < 1) {
            errores = 'debes diligencial al menos la cantidad de 1 producto.'
        } else if (!regex.test(trimmed)) {
            errores = 'Este campo solo debe contener numeros.'
        } else {
            errores = ''
        }
    }

    if (name === 'municipioLocalidad') {
        const regex = /^(Caldas|Bello|Itagui|Envigado|Sabaneta|Medellin|Copacabana|La Estrella)$/i
        const trimmed = value.trim();

        if (trimmed === '') {
            errores = 'Este campo no puede estar vacío.'
        } else if (value !== trimmed) {
            errores = 'No debe haber espacios al inicio o al final.';
        } else if (trimmed.length < 3) {
            errores = 'este valor es demasiado corto.'
        } else if (trimmed.length > 15) {
            errores = 'este valor es demasiado largo.';
        } else if (!regex.test(trimmed)) {
            errores = 'Solo se permiten municipios predeterminados: Caldas, Bello, Itagui, Envigado, Sabaneta, Medellín'
        } else if (/\s{2,}/.test(trimmed)) {
            errores = 'No se permiten espacios múltiples entre palabras.';
        } else {
            errores = ''
        }
    }

    if (name === 'direccion') {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s#\-/\.]+$/;
        const trimmed = value.trim();

        if (trimmed === '') {
            errores = 'Este campo no puede estar vacío.';
        } else if (value !== trimmed) {
            errores = 'No debe haber espacios al inicio o al final.';
        } else if (!regex.test(trimmed)) {
            errores = 'La dirección solo debe contener letras, números, y símbolos como #, -, /, .';
        } else if (/\s{2,}/.test(trimmed)) {
            errores = 'No se permiten espacios múltiples entre palabras.';
        } else {
            errores = '';
        }
    }


    if (name === 'puntoDeReferencia') {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,()#\-\/]+$/;
        const trimmed = value.trim();

        if (trimmed === '') {
            errores = 'Este campo no puede estar vacío.';
        } else if (value !== trimmed) {
            errores = 'No debe haber espacios al inicio o al final.';
        } else if (!regex.test(trimmed)) {
            errores = 'Solo se permiten letras, números y símbolos como ., (), #, -, /.';
        } else if (/\s{2,}/.test(trimmed)) {
            errores = 'No se permiten espacios múltiples entre palabras.';
        } else {
            errores = '';
        }
    }


    if (name === 'notasAdicionales') {
        const regex = /^[A-Za-z0-9\s.,;:()-]+$/
        const trimmed = value.trim();

        if (trimmed === '') {
            errores = 'Este campo no puede estar vacío.'
        } else if (value !== trimmed) {
            errores = 'No debe haber espacios al inicio o al final.';
        } else if (trimmed.length < 5) {
            errores = 'este valor es demasiado corto.'
        } else if (trimmed.length > 150) {
            errores = 'este valor es demasiado largo.';
        } else if (!regex.test(trimmed)) {
            errores = 'Este campo solo debe contener letras y espacios y simbolos como ., ;: ()'
        } else if (/\s{2,}/.test(trimmed)) {
            errores = 'No se permiten espacios múltiples entre palabras.';
        } else {
            errores = ''
        }
    }



    // Validaciones para en componente exactamente para el modal para crear un cliente


    if (name === 'NombreCliente') {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/
        const trimmed = value.trim();

        if (trimmed === '') {
            errores = 'Este campo no puede estar vacío.'
        } else if (value !== trimmed) {
            errores = 'No debe haber espacios al inicio o al final.';
        } else if (trimmed.length <= 3) {
            errores = 'este valor es demasiado corto.'
        } else if (trimmed.length >= 30) {
            errores = 'este valor es demasiado largo.';
        } else if (!regex.test(trimmed)) {
            errores = 'Este campo solo debe contener letras y espacios.'
        } else if (/\s{2,}/.test(trimmed)) {
            errores = 'No se permiten espacios múltiples entre palabras.';
        } else {
            errores = ''
        }
    }

    if (name === 'NumeroDocumento') {
        const regex = /^[0-9]+$/
        const trimmed = value.trim()

        if (trimmed === '') {
            errores = 'Este campo no puede estar vacío.'
        } else if (value !== trimmed) {
            errores = 'No debe haber espacios al inicio o al final.';
        } else if (trimmed.length < 10) {
            errores = 'este valor es demasiado corto.'
        } else if (trimmed.length > 30) {
            errores = 'este valor es demasiado largo.';
        } else if (!regex.test(trimmed)) {
            errores = 'Este campo solo debe contener numeros.'
        } else {
            errores = ''
        }
    }

    if (name === 'CorreoElectronico') {
        const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        const trimmed = value.trim();

        if (trimmed === '') {
            errores = 'Este campo no puede estar vacío.';
        } else if (!regex.test(trimmed)) {
            errores = 'El correo debe tener un formato válido, como ejemplo@dominio.com.';
        } else {
            errores = '';
        }
    }



    if (name === 'NumeroContacto') {
        const regex = /^[0-9]+$/
        const trimmed = value.trim()

        if (trimmed === '') {
            errores = 'Este campo no puede estar vacío.'
        } else if (value !== trimmed) {
            errores = 'No debe haber espacios al inicio o al final.';
        } else if (trimmed.length < 10) {
            errores = 'este valor es demasiado corto.'
        } else if (trimmed.length > 12) {
            errores = 'este valor es demasiado largo.';
        } else if (!regex.test(trimmed)) {
            errores = 'Este campo solo debe contener numeros.'
        } else {
            errores = ''
        }
    }


    return errores;
}
