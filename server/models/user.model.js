const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minLength: [3, "Must be at least 3 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [3, "Must be at least 3 characters"]
    }
}, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get( () => this.confirmPassword)
    .set( value => this.confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Passwords must match")
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
});

const User = mongoose.model("User", UserSchema);
module.exports = User;