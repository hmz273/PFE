const moment = require('moment');
const Commande = require('../model/Booking');


exports.createCommande = async (req, res, next) => {
    try {
        const { checkIn, checkOut, carsId, userId, price, phone, cin } = req.body;
        const days = moment(checkOut).diff(moment(checkIn), 'days');
        const formatDate = (date, format = 'YYYY-MM-DD') =>
              moment(date).format(format);
        const checkInDate = formatDate(checkIn);
        const checkOutDate = formatDate(checkOut);
        const { id } = req.params;
        const commande = await Commande.findOne({
          _id: id,
        }).populate('Cars')

        // commande already exists
        if (commande) {
            res.status(409); // conflict error
            const error = new Error('commande already exists');
            return next(error);
        } 
           
        const newcommande = await Commande.create({
          checkIn: checkInDate,
          checkOut: checkOutDate,
          cars: carsId,
          user: userId,
          totalPrice: price * days,
          days,
          phone,
          cin
        
        });
        res.status(201).json(newcommande);
    } catch(error) {
        next(error);
    }
}

exports.updateCommande = async (req, res, next) => {
    const days = moment(checkOut).diff(moment(checkIn), 'days');
    const formatDate = (date, format = 'YYYY-MM-DD') =>
          moment(date).format(format);
    const checkInDate = formatDate(checkIn);
    const checkOutDate = formatDate(checkOut);
    const { id } = req.params;
    const { checkIn, checkOut, price } = req.body;
  try {
    const commande = await Commande.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        days,
        totalPrice: price * days,
      },
      { new: true }
    );
    if (!commande) {
      return res.status(404).json({
        error: true,
        message: 'error to update the commande',
      });
    }
    res.status(200).json({
      error: false,
      message: 'commande has been updated successfully',
      data: commande,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      data: null,
    });
  }
}

exports.removeCommandeById = async (req, res) => {
    const { id } = req.params;
    try {
      const commande = await Commande.findByIdAndDelete(id);
      if (!commande) {
        return res.status(404).json({
          error: true,
          message: 'commande not found',
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: 'commande deleted successfully',
        commande,
      });
    } catch (error) {
      res.status(500).json({
        error: false,
        message: error.message,
        data: null,
      });
    }
  };

exports.getCommandeById = async (req, res) => {
    const { id } = req.params;
    try {
      const commande = await Commande.findById(id);
      if (!commande) {
        return res.status(404).json({
          error: true,
          message: `Cannot find commande with this id ${id}`,
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: null,
        data: commande,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
  };

exports.getAllCommande = async (req, res) => {
    try {
      const commande = await Commande.find()
      if (!commande) {
        return res.status(404).json({
          error: true,
          message: 'commande not found',
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: 'commande retrieved successfully',
        data: commande,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
  };

exports.cancelReservation = async (req, res) => {
    const { id } = req.params;
    try {
      const commande = await Commande.findById(id);
      await Commande.findByIdAndUpdate(id, {
        status: 'canceld',
      });
  
      return res.status(200).json({
        error: false,
        message: 'Reservation cancelled successfully',
        data: commande,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
  };

exports.progressReservation = async (req, res) => {
    const { id } = req.params;
    try {
      const commande = await Commande.findById(id);
      await Commande.findByIdAndUpdate(id, {
        status: 'onProgress',
      });
  
      return res.status(200).json({
        error: false,
        message: 'Reservation onProgress...',
        data: commande,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
  };

exports.valideReservation = async (req, res) => {
    const { id } = req.params;
    try {
      const commande = await Commande.findById(id);
      await Commande.findByIdAndUpdate(id, {
        status: 'confirmed',
      });
  
      return res.status(200).json({
        error: false,
        message: 'Reservation confirmed...',
        data: commande,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
  }; 