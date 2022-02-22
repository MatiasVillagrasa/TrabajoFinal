var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel');
var productosModel = require('../models/productosModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/bd');

router.get('/novedades', async function (req, res, next) {
    try {
        let novedades = await novedadesModel.getNovedades();

        novedades = novedades.map(novedad => {
            if (novedad.img_id) {
                const imagen = cloudinary.image(novedad.img_id, {
                    width: 960,
                    height: 200,
                    crop: 'fill'
                });
                return {
                    ...novedad,
                    imagen
                }
            } else {
                return {
                    ...novedad,
                    imagen: ''
                }
            }
        });

        res.json(novedades);

    } catch (error) {
        console.log(error);
    }
});

router.get('/productos', async function (req, res, next) {
    try {
        let productos = await productosModel.getProductos();

        productos = productos.map(producto => {
            if (producto.id_imagen) {
                const imagen = cloudinary.image(producto.id_imagen, {
                    width: 450,
                    height: 400,
                    crop: 'fill'
                });
                return {
                    ...producto,
                    imagen
                }
            } else {
                return {
                    ...producto,
                    imagen: ''
                }
            }
        });

        res.json(productos);

    } catch (error) {
        console.log(error);
    }
});

router.post('/contacto', async (req, res) => {
    try {
        const mail = {
            to: 'matiasnv12@gmail.com',
            subject: 'Contacto Web',
            html: `${req.body.nombre} ${req.body.apellido} se contacto a traves de la web y quiere mas informacion a este correo: ${req.body.email}. <br> 
                    Ademas hizo el siguiente comentario: ${req.body.mensaje}. <br>
                    Su telefono es: ${req.body.telefono}.`
        }

        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        await transport.sendMail(mail);

        res.status(201).json({
            error: false,
            message: 'Mensaje Enviado'
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;