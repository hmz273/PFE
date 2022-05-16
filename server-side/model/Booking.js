const Mongoose = require("mongoose");
const Schema = Mongoose.Schema

const BookingSchema = new Mongoose.Schema({
    
  days: Number,
  totalPrice: Number,

  checkIn: { type: Date, 
  required: 'Check in date is required'
  },

  checkOut: { type: Date,
  required: 'Check out date is required'
  },

  phone: {
    type: String,
    required: true,
  },

  cin: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    default: "pending",
    required: true,
  },
  
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cars: { type: Schema.Types.ObjectId, ref: 'Cars', required: true },
  

});

const Booking = Mongoose.model("Booking", BookingSchema);

module.exports = Booking;
