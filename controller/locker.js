let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Locker = require('../model/locker');

module.exports.displaySearchPage = (req, res, next) => {
    let location = {"location":req.body.search};

    Locker.find(location, (err, LockerList) => {
        if(err)
        {
            console.log(err);
            res.end(err);
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

module.exports.processAddPage = (req, res, next) => {
    let newLocker = Locker({
        "name": req.body.name,
        "location": req.body.location,
        "price": req.body.price,
        "size": req.body.size
        
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


//Query for Edit
module.exports.displayEditPage = (req, res, next) => {
        let lockerId = req.params.id;

        Locker.findById(lockerId, (err, lockerForUpdate) => {
            if(err){
                console.log(err);
                res.end(err);
            } else{
                //show the view ///need to be fixed after view implemented
                res.render('editLocker/edit', lockerForUpdate);
            }
        })
}
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedLocker = Locker({
        "_id": id,
        "name": req.body.name,
        "location": req.body.location,
        "price": req.body.price,
        "size": req.body.size
    });

    Locker.updateOne({_id: id}, updatedLocker, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/lockerlist');
        }
    })
}

//Query for Delete
module.exports.processDelete = (req, res, next) =>{
    let id = req.params.id;

    Locker.remove({_id: id}, (err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/lockerlist');
        }
    })
}


