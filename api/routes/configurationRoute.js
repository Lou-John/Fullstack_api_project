const express = require("express")
const router = express.Router();
const configurationController = require("../controlleurs/configurationController");
const verifyToken = require("../middlewares/authMiddlewares");
const configuration = require("../models/configuration");

// Routes configuration
router.get("", verifyToken, configurationController.getConfigurations);
router.get("/:id", verifyToken, configurationController.getConfiguration);
router.put("/:id",verifyToken, configurationController.updateConfiguration);
router.delete("/:id",verifyToken, configurationController.deleteConfiguration);
router.post("/add",verifyToken, configurationController.createConfiguration);

module.exports = router;