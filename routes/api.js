var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");

// alterar para casamento
var initialForm = require("../models/wedding");

router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
      //res.json({success: false, msg: 'Please pass username and password.'});
      res.redirect('../erro.html')
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          //return res.json({success: false, msg: 'Username already exists.'});
          return res.redirect('../existe.html')
        }
        //res.json({success: true, msg: 'Successful created new user.'})
        res.redirect('../sucesso.html')
        ;
      });
    }
  });

  router.post('/signin', function(req, res) {
    //console.log(req.body)
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.secret, {expiresIn: 90000});
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });
  
  router.post('/wedding', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      console.log(req.body);
      var newInitialForm = new initialForm({
        casal: {
            noivo: {
                nome: req.body.casal.noivo.nome,
                idade: req.body.casal.noivo.idade,
                genero: req.body.casal.noivo.genero
            },
            noiva: {
                nome: req.body.casal.noiva.nome,
                idade: req.body.casal.noiva.idade,
                genero: req.body.casal.noiva.genero
            }
        },
        local: {
            cidade: req.body.local.cidade,
            estado: req.body.local.estado
        },
        contato: {
            nomeContato: req.body.contato.nomeContato,
            email: req.body.contato.email,
            telefone: req.body.contato.telefone
        },
        data: {
            diaCasamento: req.body.data.diaCasamento,
            mesCasamento: req.body.data.mesCasamento,
            anoCasamento: req.body.data.anoCasamento,
            periodoCasamento: req.body.data.periodoCasamento
        },
        insert: Date.now(),
        update: Date.now()
      });
  
      newInitialForm.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Failure while trying to register the new wedding', error: err.toString()});
        }
        res.json({success: true, msg: 'New wedding registered'});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  router.get('/wedding', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      initialForm.find(function (err, weddings) {
        if (err) return next(err);
        res.json(weddings);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  
  module.exports = router
