var express = require('express');
var router = express.Router();

let lockerController = require('../controller/locker');

function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


/* GET locker list. */
router.get('/', requireAuth, lockerController.displayLockerList);

/* GET add page */
router.get('/add', requireAuth, lockerController.displayAddPage);

/* Process add page */
router.post('/add', requireAuth, lockerController.processAddPage);

router.get('/image',  lockerController.displayImage);

router.post('/image',  lockerController.processDetailsPage);

router.post('/update/:id', requireAuth,  lockerController.processUpdatePage);

router.get('/update/:id', requireAuth, lockerController.displayUpdatePage);

router.get('/details/:id',  lockerController.displayDPage);

router.get('/delete/:id', requireAuth, lockerController.Delete);

module.exports = router;
