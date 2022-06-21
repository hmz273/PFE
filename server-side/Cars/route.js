const express = require("express");
const router = express.Router();

const { createCar, updateCar, removeCarById, getCarById, getAllCars } = require("./cars");
const { adminAuth } = require("../middleware/auth");
const upload = require("../middleware/multer");

router.route("/new").post( adminAuth, upload.array("images", 6), createCar);
router.route("/:id").put( adminAuth, upload.array("images", 6), updateCar);
router.route("/:id").delete( adminAuth, removeCarById);
router.route("/:id").get( getCarById);
router.route("/").get( getAllCars);

module.exports = router;