var express = require('express');
var router = express.Router();

let lockerController = require('../controller/locker');




/* GET locker list. */
router.get('/', lockerController.displayLockerList);

/* GET add page */
router.get('/add', lockerController.displayAddPage);

/* Process add page */
router.post('/add',  lockerController.processAddPage);

router.get('/details', lockerController.displayDetailsPage);

router.post('/upload',   lockerController.processDetailsPage);

router.post('/update/:id',  lockerController.processUpdatePage);

router.get('/update/:id', lockerController.displayUpdatePage);

router.get('/details/:id', lockerController.displayDPage);

router.get('/delete/:id',  lockerController.Delete);

module.exports = router;
