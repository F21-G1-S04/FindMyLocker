let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let Locker = require('../model/locker');
let userModel = require('../model/user');
let User = userModel.User; 
let jwt = require('jsonwebtoken');
let DB = require('../db');
const { Console } = require('console');


module.exports.displayHomePage = function(req, res, next) {
    res.render('index', { title: 'Home',page: 'home', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displaySearchPage = (req, res, next) => {
    let location = {location:{ $regex : new RegExp(req.body.search, "i") } };

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
            lockerList: LockerList , page: 'lockerlist', displayName: req.user ? req.user.displayName : ''
            }); 
        }
    });
}

//Advanced Search
module.exports.displayAdvancedSearch = (req, res, next) => {

    res.render('index', { title: 'Advanced Search',page: 'advancedSearch', displayName: req.user ? req.user.displayName : '' });

}

module.exports.displayAdvancedSearchResult = (req, res, next) => {
    let searchOption = {
    "name":{ $regex : new RegExp(req.body.name, "i") },
    "location": { $regex : new RegExp(req.body.location, "i") },
    "size" : { $regex : new RegExp(req.body.size, "i") }
    };
    Locker.find(searchOption, (err, LockerList) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{  
            res.render('index', 
            {title: 'Locker list', 
            lockerList: LockerList , page: 'lockerlist', displayName: req.user ? req.user.displayName : ''
            }); 
        }
    });
}


module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    
    if(!req.user)
    {
        res.render('index', 
        {
            page:"login",
           title: "Login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' 
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

module.exports.processLoginPage = (req, res, next) => {
    console.log(req.body.username);
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Username/password is invalid');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }
            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }
            let duration = 604800;
            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: duration // 1 week
            });
            return res.redirect('/locker');

        });
    })(req, res, next);
}

module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            console.log(err);
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('index',
            {
                page:'register',
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/locker')
            });
        }
    });
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('index',
        {
            page:'register',
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}