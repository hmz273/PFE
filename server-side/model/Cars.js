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

  price: {
    type: String,
    required: true,
  },

  images: [{
        type: String,
        required: [true, 'Hotel must have at least 4 images']
    }],
  
  category: {
     type: Schema.Types.ObjectId,
      ref: 'Category', 
      required: true
    },

  
});

const Cars = Mongoose.model("Cars", CarsSchema);

module.exports = Cars;
