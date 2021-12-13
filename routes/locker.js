var express = require('express');
var router = express.Router();

let lockerController = require('../controller/locker');

const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");


function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


  

  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });



/* GET locker list. */
router.get('/', requireAuth, lockerController.displayLockerList);

/* GET add page */
router.get('/add', requireAuth, lockerController.displayAddPage);

/* Process add page */
router.post('/add', requireAuth, upload.single('myImage'), lockerController.processAddPage);



router.post('/update/:id', requireAuth, upload.single('myImage'), lockerController.processUpdatePage);

router.get('/update/:id', requireAuth, lockerController.displayUpdatePage);

router.get('/details/:id',  lockerController.displayDetailsPage);

router.get('/delete/:id', requireAuth, lockerController.Delete);

module.exports = router;
