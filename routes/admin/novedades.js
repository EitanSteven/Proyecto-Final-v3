var express = require('express');
var router = express.Router();
var novedadesModel = require('../../modelos/novedadesModel')

/*RENDERING VIEWS*/

router.get('/', async function(req, res, next) {

    var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

/* ELIMINAR NOVEDADES */

router.get('/delete/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedades(id);
    res.redirect('/admin/novedades')
});

/* AGREGAR NOVEDADES */

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != '' && req.body.subtitulo != '' && req.body.cuerpo != '') {
            await novedadesModel.addNews(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                menssage: 'Todos los campos son requeridos.'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo cargar la novedad.'
        });
    }
});

/* EDIT */

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    });
});

router.post('/modificar', async (req, res, next) => {
   try {
    var obj = {
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        cuerpo: req.body.cuerpo
    }

    console.log(obj) // Para ver los datos que trae

    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
   } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
        layout: 'admin/layout',
        error: true,
        message: 'No se pudo modificar la novedad.'
    })
   }
})

module.exports = router;