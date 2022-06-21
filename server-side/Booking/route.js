const express = require("express");
const router = express.Router();""

const { createCommande, updateCommande, removeCommandeById, getCommandeById, getAllCommande, cancelReservation, progressReservation, valideReservation } = require("./booking");
const { userAuth, adminAuth } = require("../middleware/auth");


router.route("/new").post( createCommande);
router.route("/:id").put( userAuth, updateCommande);
router.route("/:id").delete( userAuth, removeCommandeById);
router.route("/:id").get( userAuth, adminAuth, getCommandeById);
router.route("/").get(  getAllCommande );
router.route("/cancel/:id").put( adminAuth, cancelReservation);
router.route("/valide/:id").put( adminAuth, valideReservation);

module.exports = router;