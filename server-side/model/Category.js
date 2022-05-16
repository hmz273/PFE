const Mongoose = require("mongoose");
const Schema = Mongoose.Schema

const CategorySchema = new Mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  
  images: [{
    type: String,
    required: [true, 'Hotel must have at least 4 images']
}],

});

const Category = Mongoose.model("Category", CategorySchema);

module.exports = Category;
