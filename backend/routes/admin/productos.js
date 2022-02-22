var express = require('express');
var router = express.Router();
var productosModel = require('../../models/productosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        var productos = await productosModel.getProductos();

        productos = productos.map(producto => {
            if (producto.id_imagen) {
                const imagen = cloudinary.image(producto.id_imagen, {
                    width: 100,
                    height: 100,
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

        res.render('admin/productos',
            {
                layout: 'admin/layout',
                usuario: req.session.nombre,
                productos
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
        let producto = await productosModel.getProductoPorId(id);
        if (producto.id_imagen) {
            await (destroy(producto.id_imagen));
        }

        await productosModel.eliminarProductoPorId(id);
        res.redirect('/admin/productos');
    } catch (error) {
        console.log(error);
    }
});

router.get('/modificar/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        var producto = await productosModel.getProductoPorId(id);
        res.render('admin/modificar',
            {
                layout: 'admin/layout',
                producto
            })
    } catch (error) {
        console.log(error);
    }
});

router.post('/agregar', async (req, res, next) => {
    try {
        var id_imagen = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            id_imagen = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.producto != "" && req.body.descripcion != "") {
            await productosModel.insertProductos({
                ...req.body,
                id_imagen
            });
            res.redirect('/admin/productos');
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
        let id_imagen = req.body.img_original;
        let borrar_img_vieja = false;

        if (req.body.img_delete === "1") {
            id_imagen = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                id_imagen = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }

        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

        var obj = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            id_imagen
        }

        await productosModel.updateProductoPorId(obj, req.body.id);
        res.redirect('/admin/productos');

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