const mongoose = require('mongoose');
const { Schema } = mongoose;

const BureauSchema = new Schema(
  {
    establishmentId : {
      type : mongoose.Schema.Types.ObjectId, 
      ref : "Establishment",
    },
    name: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    color : {
        type : String, 
        required : false, 
        default : "#303030"
    },  
    services: [{ 
      id: {
        type : Schema.Types.ObjectId,
        ref : "Service"
      },
      queue: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Ticket',
        }
      ]
    }],
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Bureau', BureauSchema);