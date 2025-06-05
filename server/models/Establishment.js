const mongoose = require('mongoose');

const establishmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required : false, 
            default : "",
        }, 
        colorTitle : {
            type: String,
            required : false,
            default : "#303030", 
        }, 
        slogan: {
            type: String,
            required : false, 
            default : "",
        },
        website: {
            type: String,
            required : false, 
            default : "",
        },
        description: {
            type: String,
            required : false, 
            default : "",
        }, 
        email : {
            type: String,
            required : false, 
            default:  "",
        },
        images : [{
            type : String, 
            required : false
        }], 
    }, 
    { 
        timestamps: true
    }
);

module.exports = mongoose.model('Establishment', establishmentSchema);