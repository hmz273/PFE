const express = require("express");
const router = express.Router();""

const { createCommande, updateCommande, removeCommandeById, getCommandeById, getAllCommande, cancelReservation, progressReservation, valideReservation } = require("./booking");
// const { userAuth, adminAuth } = require("../middleware/auth");
// const { upload } = require("../middleware/upload");


router.route("/new").post( createCommande);
router.route("/:id").put( updateCommande);
router.route("/:id").delete( removeCommandeById);
router.route("/:id").get( getCommandeById);
router.route("/").get( getAllCommande);
router.route("/cancel/:id").post( cancelReservation);
router.route("/progress/:id").post( progressReservation);
router.route("/valide/:id").post( valideReservation);

module.exports = router;