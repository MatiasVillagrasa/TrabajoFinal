var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        var novedades = await novedadesModel.getNovedades();

        novedades = novedades.map(novedad => {
            if (novedad.img_id) {
                const imagen = cloudinary.image(novedad.img_id, {
                    width: 100,
                    height: 100,
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

        res.render('admin/novedades',
            {
                layout: 'admin/layout',
                usuario: req.session.nombre,
                novedades
            });

    } catch (error) {
        console.log(error);
    }
});

router.get('/agregar', (req, res, next) => {
    try {
        res.render('admin/agregar',
            {
                layout: 'admin/layout',
            });

    } catch (error) {
        console.log(error);
    }
});

router.get('/eliminar/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        let novedad = await novedadesModel.getNovedadesPorId(id);
        if (novedad.img_id) {
            await (destroy(novedad.img_id));
        }

        await novedadesModel.eliminarNovedadesPorId(id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error);
    }
});

router.get('/modificar/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        var novedad = await novedadesModel.getNovedadesPorId(id);
        res.render('admin/modificar',
            {
                layout: 'admin/layout',
                novedad
            })
    } catch (error) {
        console.log(error);
    }
});

router.post('/agregar', async (req, res, next) => {
    try {
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedades({
                ...req.body,
                img_id
            });
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/agregar',
                {
                    layout: 'admin/layout',
                    error: true,
                    message: 'Debe completar todos los campos'
                })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar',
            {
                layout: 'admin/layout',
                error: true,
                message: 'No se pudo cargar la novedad'
            })
    }
});

router.post('/modificar', async (req, res, next) => {
    try {
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;

        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }

        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo,
            img_id
        }

        await novedadesModel.updateNovedadesPorId(obj, req.body.id);
        res.redirect('/admin/novedades');

    } catch (error) {
        console.log(error);
        res.render('admin/modificar',
            {
                layout: 'admin/layout',
                error: true,
                message: 'No se pudo modificar la novedad'
            })
    }
});

module.exports = router;