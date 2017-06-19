//////////////////////////
// Requires
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var bcrypt   = require('bcrypt-nodejs');

//////////////////////////
// Schema
//////////////////////////

var userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean
    }
});

///////////////////////
// Generating a Hash
//////////////////////

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

////////////////////////////////////
// Password Validation
///////////////////////////////////

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


//////////////////////////
// Export Schema
//////////////////////////

var User = mongoose.model('User', userSchema, 'users');
module.exports.User = User;