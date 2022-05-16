const express = require("express");
const router = express.Router();

const { createCar, updateCar, removeCarById, getCarById, getAllCars } = require("./cars");
// const { adminAuth } = require("../middleware/auth");
const upload = require("../middleware/multer");

router.route("/new").post( upload.array("images", 6), createCar);
router.route("/:id").put( updateCar);
router.route("/:id").delete( removeCarById);
router.route("/:id").get( getCarById);
router.route("/").get( getAllCars);

module.exports = router;