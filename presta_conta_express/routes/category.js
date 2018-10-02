var express = require('express');
var router = express.Router();
const db = require('../db');


router.get('/categories', global.authenticationMiddleware(), function(req, res) {
    db.findallcategories((e, docs) => {
        if(e)   { return console.log(e); }
        res.render('categories', { title: 'Lista de Categorias', docs: docs });
    })
  })

router.get('/category/:id', global.authenticationMiddleware(), function(req, res, next) {
    var id = req.params.id;
    db.findonecategory(id, (e, docs) => {
        if(e) { return console.log(e); }
        res.render('category', { title: 'Edição de Categoria', doc: docs[0],
            action: '/category/editcategory/' + docs[0]._id });
      });
  })
  
router.post('/editcategory/:id', function(req, res) {
    var id = req.params.id;
    var description = req.body.email;
    db.updateuser(id, {description}, (e, result) => {
          if(e) { return console.log(e); }
          res.redirect('/category/categories');
      });
  });
    

router.get('/newcategory', global.authenticationMiddleware(), function(req, res, next) {
    res.render('category', { title: 'Nova Categoria', 
      doc: {"description":""}, 
      action: '/category/newcategory' });
  });

  
router.post('/newcategory', function(req, res) {
    var description = req.body.description;
    db.insertcategory({description}, (err, result) => {
            if(err) { return console.log(err); }
            res.redirect('/category/categories');
        })
  }); 
  
  
router.get('/deletecategory/:id', global.authenticationMiddleware(), function(req, res) {
    var id = req.params.id;
    db.deleteonecategory(id, (e, r) => {
          if(e) { return console.log(e); }
          res.redirect('/category/categories');
        });
  });
  


module.exports = router;