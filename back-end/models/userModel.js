const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        unique:[true, "Choose a different username"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select:false
    },
    role:
    {
        type:String,
        //required: [true, "please specify role"],
        default:"user"
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please comfirm your password!'],
        validate: {
            //This only works on CREATE and SAVE
            validator: function (el) {
                return el === this.password;
            },
            message: `Passwords are not the same ${this.password}`
            
        }
    },

});

userSchema.pre('save', async function (next) {
    //Only run this if passwd is modified 
    if (!this.isModified('password')) return next();

    //Hash passwd with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Del PswdConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.correctPassword2 = async function (candidatePassword, userPassword) {
    return await (candidatePassword === userPassword);
}
const User = mongoose.model('User', userSchema);

module.exports = User;