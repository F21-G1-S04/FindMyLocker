var express = require('express');
var router = express.Router();

let lockerController = require('../controller/locker');

/* GET locker list. */
router.get('/', lockerController.displayLockerList);

/* GET add page */
router.get('/add', lockerController.displayAddPage);

/* Process add page */
router.post('/add',  lockerController.processAddPage);

/* Process search page */
router.post('/',  lockerController.displaySearchPage);

module.exports = router;
