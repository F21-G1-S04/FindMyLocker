let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Locker = require('../model/locker');



const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");




const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });



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
            lockerList: LockerList , page: 'lockerlist'
            });      
        }
    });
}


module.exports.displayAddPage = (req, res, next) => {
    res.render('index', {title: 'Create a Locker Location', page: 'add' 
    })          
}

module.exports.processAddPage =  (req, res, next) => {
    let newLocker = Locker({
        "name": req.body.name,
        "location": req.body.location,
        "price": req.body.price,
        "size": req.body.size,
        "description": req.body.description,
        "address": req.body.address,
        "image":req.body.image
        
    });

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
            res.render('index', {title: 'Create a Locker Location', page: 'detailsPage', images: images 
    })
			
		}
	});
}

const imageSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
});

const ImageModel = mongoose.model("Image", imageSchema);
// Step 8 - the POST handler for processing the uploaded file

module.exports.processDetailsPage = upload.single('myImage'), (req, res, next) => {

	const obj = {
        img: {
            data: fs.readFileSync(req.file.filename),
            contentType: "image/png"
        }
    }
    const newImage = new ImageModel({
        image: obj.img
    });

    newImage.save((err) => {
        err ? console.log(err) : res.redirect("/locker/details");
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
            res.render('index', {title: 'Edit Locker', locker: lockerToEdit, page: 'update'
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
            res.render('index', {title: 'Edit Locker', locker: lockerToEdit, page: 'detailsPage'
            })
        }
    });
}


