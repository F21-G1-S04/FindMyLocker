let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Locker = require('../model/locker');



const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require('dotenv/config');
var imgModel = require('../model/image');




const app = express();





  
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  var upload = multer({ storage: storage })

module.exports.displayImage = (req, res, next) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('index', { items: items, page: 'imagesPage' , title: 'image'});
        }
    });
}


module.exports.displayLockerList = (req, res, next) => {
    Locker.find((err, LockerList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {

            res.render('index', 
            {title: 'Locker list', 
            lockerList: LockerList , page: 'lockerlist',
            displayName: req.user ? req.user.displayName : ''
            });      
        }
    });
}


module.exports.displayAddPage = (req, res, next) => {
    res.render('index', {title: 'Create a Locker Location', page: 'add',
    displayName: req.user ? req.user.displayName : '' 
    })          
}

module.exports.processAddPage =  (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }

    let newLocker = {
        name: req.body.name,
        location: req.body.location,
        price: req.body.price,
        size: req.body.size,
        description: req.body.description,
        address: req.body.address,
        // "size": req.body.size,
        // "description": req.body.description,
        // "address": req.body.address,
        img:file.filename,
        
    }

    Locker.create(newLocker, (err, Locker) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/locker');
        }
    });

}

// Step 7 - the GET request handler that provides the HTML UI

module.exports.displayDetailsPage = (req, res) => {
	ImageModel.find({}, (err, images) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
            res.render('index', {title: 'Create a Locker Location', page: 'detailsPage', images: images ,
            displayName: req.user ? req.user.displayName : ''
    })
			
		}
	});
}


// Step 8 - the POST handler for processing the uploaded file

module.exports.processDetailsPage = upload.single('image'), (req, res, next) => {
  
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/image');
        }
    });
}


module.exports.Delete = (req, res, next) => {
    let id = req.params.id;

    Locker.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             res.redirect('/locker');
        }
    });
}

module.exports.displayUpdatePage = (req, res, next) => {
    let id = req.params.id;

    Locker.findById(id, (err, lockerToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('index', {title: 'Edit Locker', locker: lockerToEdit, page: 'update',
            displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}


module.exports.processUpdatePage = (req, res, next) => {
    let id = req.params.id

    let updatedLocker = Locker({
        "_id": id,
        "name": req.body.name,
        "location": req.body.location,
        "price": req.body.price,
        "size": req.body.size,
        "description": req.body.description,
        "address": req.body.address,
        "image": req.body.image
    });

    Locker.updateOne({_id: id}, updatedLocker, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/locker');
        }
    });
}

module.exports.displayDPage = (req, res, next) => {
    let id = req.params.id;

    Locker.findById(id, (err, lockerToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('index', {title: 'Edit Locker', locker: lockerToEdit, page: 'detailsPage',
            displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}


