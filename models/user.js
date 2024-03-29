var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    name:{ type: String,required:true},
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, select: false },

});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.New) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            else {
                bcrypt.hash(user.password, salt,null, function (err, hash) {
                    if (err) {
                        next(err);
                    } else {
                        user.password = hash;
                        next();
                    }
                });
            }
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function(pw,cb){
    bcrypt.compare(pw,this.password,function(err,isMatch){
        if(err){
            return cb(err);
        }else{
            cb(null,isMatch);
        }
    });
};



module.exports = mongoose.model('User',UserSchema);
