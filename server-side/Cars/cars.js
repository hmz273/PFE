const Car = require("../model/Cars");

exports.createCar = async (req, res, next) => {
    try {
        // const { title, price, desc, categoryId, restauId } = req.body;
        const images = req.files.map((file) => {
          return file.path
        })
        const { id } = req.params;
        const car = await Car.findOne({
          _id: id,
        })

        // Car already exists
        if (car) {
            res.status(409); // conflict error
            const error = new Error('Car already exists');
            return next(error);
        } 
           
        const newcar = await Car.create({
          title: req.body.title,
          desc: req.body.desc,
          price: req.body.price,
          images: images,
      }); 
        res.status(201).json(newcar);
    } catch(error) {
        next(error);
    }
}

exports.updateCar = async (req, res, next) => {
    const { id } = req.params;
  try {
    const car = await Car.findByIdAndUpdate(
      {
        _id: id,
      },
      { ...req.body },
      { new: true }
    );
    if (!car) {
      return res.status(404).json({
        error: true,
        message: 'error to update the Car',
      });
    }
    res.status(200).json({
      error: false,
      message: 'Car has been updated successfully',
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      data: null,
    });
  }
}

exports.removeCarById = async (req, res) => {
    const { id } = req.params;
    try {
      const car = await Car.findByIdAndDelete(id);
      if (!car) {
        return res.status(404).json({
          error: true,
          message: 'Car not found',
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: 'Car deleted successfully',
        car,
      });
    } catch (error) {
      res.status(500).json({
        error: false,
        message: error.message,
        data: null,
      });
    }
};

exports.getCarById = async (req, res) => {
    const { id } = req.params;
    try {
      const car = await Car.findById(id);
      if (!car) {
        return res.status(404).json({
          error: true,
          message: `Cannot find Car with this id ${id}`,
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: null,
        data: car,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
};

exports.getAllCars = async (req, res) => {
    try {
      const cars = await Car.find()
      if (!cars) {
        return res.status(404).json({
          error: true,
          message: 'Cars not found',
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: 'Cars retrieved successfully',
        data: cars,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
};