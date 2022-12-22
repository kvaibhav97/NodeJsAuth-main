const mongoose = require('mongoose');

const SignUpSchema  = mongoose.Schema({
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true,
    }
});
//Creating Schema

const CollectionReference = mongoose.model('Details',SignUpSchema);
//Establishing collection

module.exports = CollectionReference;