let mongoose = require('mongoose');

// create a model class
let lockerModel = mongoose.Schema({
    name: String,
    location: String,
    price: Number,
    size: String
    
},
{
    collection: "lockers"
});

module.exports = mongoose.model('Locker', lockerModel);