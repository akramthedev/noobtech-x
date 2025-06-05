const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    logoUrl: {
      type: String,
      required: false,
      default : "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required : true, 
      ref : "User"
    }, 
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Service', ServiceSchema);