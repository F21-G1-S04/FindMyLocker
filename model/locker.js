let mongoose = require('mongoose');

// create a model class
let lockerModel = mongoose.Schema({
    name: String,
    location: String,
    price: Number,
    size: String,
    description: String,
    address: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
    
},
{
    collection: "lockers"
});

module.exports = mongoose.model('Locker', lockerModel);