const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: { 
            type: String, 
            required: false, 
            default : ""
        },
        lastName: { 
            type: String, 
            required: false, 
            default : ""
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true
        },
        mobile: { 
            type: String, 
            required: false, 
        }, 
        website: { 
            type: String, 
            required: false, 
        }, 
        password : {
            type : String, 
            required : true, 
        }, 
        userType: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        establishment: {
            type: mongoose.Schema.Types.ObjectId,
            required : false, 
            ref : "Establishment"
        }, 
    }, 
    { 
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);