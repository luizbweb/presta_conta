var express = require('express');
var router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs') 

  /* AUTENTICACAO */

router.get('/signup', function(req, res, next) {
    if(req.query.fail)
      res.render('signup', { title: 'Novo Usuário', message: 'Falha no cadastro do usuário!', action: '/user/signup/' });
    else
      res.render('signup', { title: 'Novo Usuário', message: null, action: '/user/signup/' });
  })
 
  
router.post('/signup', function(req, res) { 
    db.createUser(req.body.email, req.body.password, 
        req.body.name, req.body.phone, req.body.cpf, (e, result) => {
          if(e) res.redirect('/signup?fail=true')
          require('../mail')(req.body.email, 'Bem vindo ao nosso chat', 
                'Olá ' + req.body.username + ', Obrigado por se cadastrar!')
          res.redirect('/') 
       });
  });


  router.get('/forgot', function(req, res, next) {
    res.render('forgot', { });
  })


  router.post('/forgot', function(req, res, next) {
    db.findUserByEmail(req.body.email, (err, doc) => {
      if(err || !doc) res.redirect('/')//manda pro login mesmo que não ache
      const newpass = require('../util').generatePassword()
      db.changePassword(req.body.email, newpass)
      require('../mail')(req.body.email, 'Sua nova senha do prestaconta', 'Olá ' + doc.username + ', sua nova senha é ' + newpass)
      res.redirect('/')
    })
  })

  router.post('/logoff', function(req, res, next){
    req.logOut();
    res.redirect('/login');
  })



  /*USUARIOS */

  router.get('/users', global.authenticationMiddleware(), function(req, res) {
    db.findallusers((e, docs) => {
        if(e)   { return console.log(e); }
        res.render('users', { title: 'Lista de Usuários', docs: docs });
    })
  })

router.get('/edituser/:id', global.authenticationMiddleware(), function(req, res, next) {
    var id = req.params.id;
    db.findoneuser(id, (e, docs) => {
        if(e) { return console.log(e); }
        res.render('user', { title: 'Edição de Usuário', doc: docs[0], action: '/user/edituser/' + docs[0]._id });
      });
  })
  
router.post('/edituser/:id', function(req, res) {
    var id = req.params.id;
    var email = req.body.email;
    var name = req.body.name;
    var phone = req.body.phone;
    var cpf = req.body.cpf;
    db.updateuser(id, {email, name, phone, cpf}, (e, result) => {
          if(e) { return console.log(e); }
          res.redirect('/user/users');
      });
  });
    

router.get('/newuser', global.authenticationMiddleware(), function(req, res, next) {
    res.render('user', { title: 'Novo Usuário', 
      doc: {"email":"","name":"", "phone":"", "cpf":""}, 
      action: '/user/newuser' });
  });

  
router.post('/newuser', function(req, res) {
    var email = req.body.email;
    var name = req.body.name;
    var phone = req.body.phone;
    var cpf = req.body.cpf;
    db.insertuser({email, name, phone, cpf}, (err, result) => {
            if(err) { return console.log(err); }
            res.redirect('/user/users');
        })
  }); 
  
  
router.get('/deleteuser/:id', global.authenticationMiddleware(), function(req, res) {
    var id = req.params.id;
    db.deleteoneuser(id, (e, r) => {
          if(e) { return console.log(e); }
          res.redirect('/user/users');
        });
  });
  
  
router.get('/receiveuser/:id', global.authenticationMiddleware(), function(req, res, next) {
    var id = req.params.id;
    db.findoneuser(id, (e, docs) => {
        if(e) { return console.log(e); }
        res.render('receive', 
          { title: 'Recebimento de Usuário', doc: docs[0], action: '/user/receiveuser/' + docs[0]._id });
      });
    });
    

router.post('/receiveuser/:id', function(req, res) {
    var userid = req.params.id;   
    var date = req.body.date;
    var value = parseFloat(req.body.value);
    db.receiveuser({userid, date, value}, (e, result) => {
            if(e) { return console.log(e); }
            res.redirect('/user/users');
        });
    });




  module.exports = router;