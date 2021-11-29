
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'login',page: 'login' });
});

router.post('/', function(req, res, next){

});

module.exports = router;
