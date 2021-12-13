let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Locker = require('../model/locker');



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

    const file = req.file
    

    let updatedLocker = {
        _id: id,
        name: req.body.name,
        location: req.body.location,
        price: req.body.price,
        size: req.body.size,
        description: req.body.description,
        address: req.body.address,
        
    }

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

module.exports.displayDetailsPage = (req, res, next) => {
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


