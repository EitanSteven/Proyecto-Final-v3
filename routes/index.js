var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET contact page. */
router.get('/contacto', function(req, res, next) {
  res.render('contacto');
});

router.post('/contacto', async (req, res, next) => {
  var nombre = req.body.name;
  var apellido = req.body.lastname;
  var email = req.body.email;
  var asunto = req.body.subject;
  var mensaje = req.body.comments;
  
  var obj = {
    to: "eitansteven2002@hotmail.com",
    subject: asunto,
    html: `${nombre} ${apellido} se pone en contacto para recibir mas info a este correo: "${email}".<br>
    Ademas, hizo el siguiente comentario: "${mensaje}".`
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass : process.env.SMTP_PASS
    }
  })

  var info = await transporter.sendMail(obj)

  res.render('contacto', {
    message: 'Mensaje enviado correctamente.'
  })
})


/* GET histories. */
router.get('/history/nearDeath', function(req, res, next) {
  res.render('nearDeath');
});
router.get('/history/oldest_ruins', function(req, res, next) {
  res.render('oldestRuins');
});
router.get('/history/el_abismo', function(req, res, next) {
  res.render('el_abismo');
});
router.get('/history/la_dama', function(req, res, next) {
  res.render('la_dama');
}); 
router.get('/history/ruined_kingdom', function(req, res, next) {
  res.render('ruined_kingdom');
}); 
router.get('/history/mountain_lantern', function(req, res, next) {
  res.render('mountain_lantern');
});
router.get('/history/scifi_fanart', function(req, res, next) {
  res.render('scifi_fanart');
});
router.get('/history/the_last_guardian', function(req, res, next) {
  res.render('the_last_guardian');
});

module.exports = router;
