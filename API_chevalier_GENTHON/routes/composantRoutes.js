const express = require("express")
const router = express.Router();
const composantController = require("../controlleurs/composantController");
const verifyToken = require("../middlewares/authMiddlewares");
const composant = require("../models/composant");

// Routes composant
router.get("", verifyToken, composantController.getComposants);
router.get("/:id", verifyToken, composantController.getComposant);
router.put("/:id",verifyToken, composantController.updateComposant);
router.delete("/:id",verifyToken, composantController.deleteComposant);
router.post("/add", composantController.createComposant);

module.exports = router;