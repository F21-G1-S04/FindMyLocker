
var express = require('express');
var router = express.Router();
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'register',page: 'register' });
});

/* Processing search result page */
router.post('/', function(req, res, next){

});

module.exports = router;
