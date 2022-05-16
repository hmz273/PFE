const express = require("express");
const router = express.Router();

const { createCategory, updateCategory, removeCategoryById, getCategoryById, getAllCategory } = require("./category");
const { adminAuth } = require("../middleware/auth");
const upload = require("../middleware/multer");



router.route("/new").post( upload.array("images", 6), createCategory);
router.route("/:id").put( updateCategory);
router.route("/:id").delete( removeCategoryById);
router.route("/:id").get( getCategoryById);
router.route("/").get( getAllCategory);

module.exports = router;