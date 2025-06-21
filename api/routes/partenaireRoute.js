const express = require("express")
const router = express.Router();
const partenaireController = require("../controlleurs/partenaireController");
const verifyToken = require("../middlewares/authMiddlewares");
const partenaire = require("../models/partenaire");

// Routes partenaire
router.get("", verifyToken, partenaireController.getPartenaires);
router.get("/:id", verifyToken, partenaireController.getPartenaire);
router.put("/:id",verifyToken, partenaireController.updatePartenaire);
router.delete("/:id",verifyToken, partenaireController.deletePartenaire);
router.post("",verifyToken, partenaireController.createPartenaire);

module.exports = router;