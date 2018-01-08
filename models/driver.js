var mongoose = require('mongoose');

var DriverSchema = new mongoose.Schema({
    name:{type:String},
    fatherName : {type:String},
    cnic : {type:String},
    contact:{type:Number},
    age : {type:Number},
    address: {type:String},
    licenseNumber: {type:String},
    licenseType: {type:String},
    alotedVehicle:{type:mongoose.Schema.Types.ObjectId,ref:'Vehicle'}
});


module.exports = mongoose.model('Driver',DriverSchema);
