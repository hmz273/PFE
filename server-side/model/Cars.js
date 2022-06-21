const Mongoose = require("mongoose");
const Schema = Mongoose.Schema

const CarsSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  sets: {
    type: String,
    required: true,
  },

  fuel: {
    type: String,
    required: true,
  },

  boite: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  images: [{
        type: String,
        required: [true, 'Hotel must have at least 4 images']
    }],
  

  
});

const Cars = Mongoose.model("Cars", CarsSchema);

module.exports = Cars;
