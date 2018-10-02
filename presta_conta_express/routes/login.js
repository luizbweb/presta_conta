var passport = require('passport');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', message: null });
});

router.get('/login', function(req, res){
  if(req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/index', failureRedirect: '/login?fail=true' })
);

module.exports = router;
