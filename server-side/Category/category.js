const Category = require("../model/Category");

exports.createCategory = async (req, res, next) => {
    try {

      const images = req.files.map((file) => {
        return file.path
      })
        const { title } = req.body;
        const category = await Category.findOne({
            title,
        })

        // category already exists
        if (category) {
            res.status(409); // conflict error
            const error = new Error('category already exists');
            return next(error);
        } 

        const newcategory = await Category.create({
            title,
            images: images
        });

        console.log('New category has been created');
        res.status(201).json(newcategory);
    } catch(error) {
        next(error);
    }
}

exports.updateCategory = async (req, res, next) => {
    const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        error: true,
        message: 'error to update the Category',
      });
    }
    res.status(200).json({
      error: false,
      message: 'Category has been updated successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      data: null,
    });
  }
}

exports.removeCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({
          error: true,
          message: 'category not found',
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: 'category deleted successfully',
        category,
      });
    } catch (error) {
      res.status(500).json({
        error: false,
        message: error.message,
        data: null,
      });
    }
  };

exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({
          error: true,
          message: `Cannot find category with this id ${id}`,
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: null,
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
  };

exports.getAllCategory = async (req, res) => {
    try {
      const categorys = await Category.find()
      if (!categorys) {
        return res.status(404).json({
          error: true,
          message: 'categorys not found',
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: 'categorys retrieved successfully',
        data: categorys,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
  };