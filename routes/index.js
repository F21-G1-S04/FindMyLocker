var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',page: 'home' });
});

/* Processing search result page */
router.post('/', function(req, res, next){

});

module.exports = router;
