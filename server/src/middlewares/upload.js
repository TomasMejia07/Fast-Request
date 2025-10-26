const multer = require('multer'); // multer actúa como un receptor o procesador de archivos dentro del servidor.
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/* Multer Usa el “motor de almacenamiento” (storage) para decidir:
- dónde guardar ese archivo (nube o carpeta local), y
- cómo guardarlo (nombre, formato, transformaciones, etc.). */


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'perfiles_usuarios', // Carpeta en Cloudinary donde se guardarán las imágenes
        allowed_formats: ['jpg', 'jpeg', 'png', 'Webp'], // Formatos permitidos
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // transformar la imagen
    },
});


const storageEmpresa = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'logo_empresa',
        allowed_formats: ['jpg', 'jpeg', 'png', 'Webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    },
})


const uploadCloud = multer({ storage });
const uploadEmpresa = multer({ storage: storageEmpresa });

module.exports = { uploadCloud, uploadEmpresa };
