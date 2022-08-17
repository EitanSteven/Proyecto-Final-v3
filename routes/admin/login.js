var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../modelos/usuariosModel')

/*RENDERING VIEWS*/

router.get('/', function(req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

/* LOGOUT */

router.get('/logout', function (req,res,next) {
    req.session.destroy();  /*destruye vars de sesion*/
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

/*CATCHING INFO*/

router.post('/', async (req, res, next) => {
    try {
        
        console.log(req.body);
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await usuariosModel.getUserAndPassword(usuario, password);

        if (data != undefined) {
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            })
        }   // Cierre else

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;