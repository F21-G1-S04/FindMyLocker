var express = require('express');
var router = express.Router();

let lockerController = require('../controller/locker');
let indexController = require('../controller/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/login',  indexController.displayLoginPage);

router.get('/register',  indexController.displayRegisterPage);

router.post('/register',  indexController.processRegisterPage);



/* Process search page */
router.post('/',  indexController.displaySearchPage);

router.get('/advancedsearch',  indexController.displayAdvancedSearch);

router.post('/advancedSearch', indexController.displayAdvancedSearchResult);
module.exports = router;
