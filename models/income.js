var mongoose = require('mongoose');

var IncomeSchema = new mongoose.Schema({
    incomeDate : {type: Date , default:Date.now()},
    vehicle:{type:mongoose.Schema.Types.ObjectId,ref:'Vehicle'},
    expence: {type:Number},
    driver : {type:mongoose.Schema.Types.ObjectId,ref:'Driver'},
    amount : {type:Number},
    comments : {type:String},
    salery : {type:String},
    type: {type:String}
});


module.exports = mongoose.model('Income',IncomeSchema);
