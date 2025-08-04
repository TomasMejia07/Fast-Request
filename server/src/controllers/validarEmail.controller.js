const  { ValidarEmail } = require('../models');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

dotenv.config();

exports.validarEmail = async (req, res) => {
    try {
        const { correo } = req.body;
        const codigoAleatorio =  String(Math.floor(Math.random() * 900000) + 100000)

        await ValidarEmail.upsert({
            correo,
            codigo: codigoAleatorio,
            expiracion: new Date(Date.now() + 5 * 60 * 1000)
        })

        const transporter = nodemailer.createTransport({
            pool: true,
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const sendToUsuario = {
            from: `"Fast Request" <${process.env.EMAIL_USER}>`,
            to: correo,
            subject: "Codigo de verificacion - Fast Request",
            text: `Hola ${correo},\n\nGracias por Elegirnos.\n\nSaludos,\nEquipo Fast Request`,
            html: `
            <!DOCTYPE html>
                <html lang="es">
                <head>
                <meta charset="UTF-8">
                <title>Confirmación de Cuenta</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f7f9fc;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px; margin:30px auto; background-color:#ffffff; border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                    <td style="padding:30px 25px; background-color:#ff7b38; border-radius:8px 8px 0 0;"></td>
                    </tr>

                    <!-- Cuerpo -->
                    <tr>
                    <td style="padding:35px 25px; text-align:center;">
                        <h1 style="color:#2d3748; font-size:26px; margin:0 0 20px;">¡Gracias por elegirnos, ${correo}!</h1>
                        <p style="color:#444; font-size:16px; margin:0 0 30px;">
                        Estamos encantados de darte la bienvenida. Solo falta un paso para activar tu cuenta:
                        </p>
                        <h3 style="color:#000; font-size:20px; margin:0 0 10px;">Tu código de verificación:</h3>
                        <p style="color:#ff6200; font-size:40px; font-weight:bold; margin:10px 0;">${codigoAleatorio}</p>
                        <p style="color:#888; font-size:14px; margin-top:20px;">Este código expirará en 5 minutos.</p>
                    </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                    <td style="padding:20px; background-color:#ff7b38; border-radius:0 0 8px 8px; text-align:center;">
                        <p style="color:#fff; font-size:13px; margin:5px 0;">© ${new Date().getFullYear()} Fast Request. Todos los derechos reservados.</p>
                    </td>
                    </tr>

                </table>
                </body>
                </html>`,
        };

        await transporter.sendMail(sendToUsuario)
        res.status(200).json({ message: 'Código enviado y guardado correctamente.' });

    } catch (err) {
        console.error('Error al validar el correo:', err);
        res.status(500).json({ err: 'Error interno del servidor.' });
    }
}

exports.validarCodigo = async (req, res) => {
    try {
        const { correo, codigo } = req.body;
        const registro = await ValidarEmail.findOne({ where: { correo } });

        if (!registro) {
            return res.status(404).json({ message: 'Correo no encontrado.' });
        }

        if (registro.codigo !== String(codigo).trim()) {
            return res.status(400).json({ message: 'Código incorrecto.' });
        }

        const ahora = new Date();
        if (ahora > registro.expiracion) {
            await ValidarEmail.destroy({ where: { correo } });
            return res.status(400).json({ message: 'El código ha expirado.' });
        }

        await ValidarEmail.destroy({ where: { correo } });
        res.status(200).json({ verified: true, message: 'Código verificado y usuario registrado.' });

    } catch (err) {
        console.error('Error al validar el código:', err);
        res.status(500).json({ verified: false, err: 'Error interno del servidor.' });
    }
}