var mongoose = require('mongoose');

var VehicleSchema = new mongoose.Schema({
    name : {type:String},
    registration : {type:String , unique: true},
    company : {type:String},
    model : {type:String},
    ownerName : {type:String},
    milage : {type:String},
    power : {type:String},
    color: {type:String}
});


module.exports = mongoose.model('Vehicle',VehicleSchema);
