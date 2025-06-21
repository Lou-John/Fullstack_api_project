const express = require("express")
const router = express.Router();
const partenaireController = require("../controlleurs/partenaireController");
const verifyToken = require("../middlewares/authMiddlewares");
const partenaire = require("../models/partenaire");

// Routes partenaire
router.get("", verifyToken, partenaireController.getConfigurations);
router.get("/:id", verifyToken, partenaireController.getConfiguration);
router.get("/user/:userId", verifyToken, partenaireController.getConfigurationsByUser);
router.put("/:id",verifyToken, partenaireController.updateConfiguration);
router.delete("/:id",verifyToken, partenaireController.deleteConfiguration);
router.post("/add",verifyToken, partenaireController.createConfiguration);

module.exports = router;