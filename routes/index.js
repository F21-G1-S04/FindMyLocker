var express = require('express');
var router = express.Router();

let indexController = require('../controller/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/login',  indexController.displayLoginPage);

router.post('/login', indexController.processLoginPage);

router.get('/register',  indexController.displayRegisterPage);

router.post('/register',  indexController.processRegisterPage);

router.get('/logout', indexController.logout);

//router.post('/uploadphoto',  indexController.processDetailsPage);

/* Process search page */
router.post('/',  indexController.displaySearchPage);

router.get('/advancedsearch',  indexController.displayAdvancedSearch);

router.post('/advancedSearch', indexController.displayAdvancedSearchResult);
module.exports = router;
