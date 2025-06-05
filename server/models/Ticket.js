const mongoose = require('mongoose');
const { Schema } = mongoose;



const TicketSchema = new Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['waiting', 'called', 'served', 'cancelled'],
      default: 'waiting',
    },
    calledAt: {
      type: Date,
      default: null
    },
    servedAt: {
      type: Date,
      default: null
    },
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('Ticket', TicketSchema);