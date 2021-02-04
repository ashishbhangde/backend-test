var mongoose = require('mongoose');
var RegisterSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNo:Number,
    images: [],
    fatherName: String,
    email: String,
    address: String,
    gender: String,
    dob: String,
    country: String
});
module.exports = mongoose.model('RegisterStudent', RegisterSchema);