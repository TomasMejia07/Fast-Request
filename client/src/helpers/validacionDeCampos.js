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

    if (name === 'password') {
        if (value.length < 8 || value.length > 15) {
            errores = 'La contraseña debe tener entre 8 y 15 caracteres'
        } else if (!/[A-Z]/.test(value)) {
            errores = 'La contraseña debe incluir al menos una letra mayúscula'
        } else if (!/[a-z]/.test(value)) {
            errores = 'La contraseña debe incluir al menos una letra minúscula'
        } else if (!/\d/.test(value)) {
            errores = 'La contraseña debe incluir al menos un número'
        } else if (!/[!@#$%^&*]/.test(value)) {
            errores = 'La contraseña debe incluir un carácter especial (!@#$%^&*)'
        } else {
            errores = ''
        }
    }
    
    return errores;
}
