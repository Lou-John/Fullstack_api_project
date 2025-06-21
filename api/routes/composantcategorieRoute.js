const express = require("express")
const router = express.Router();
const composantCategorieController = require("../controlleurs/composantCategorieController");
const verifyToken = require("../middlewares/authMiddlewares");
const composantCategorie = require("../models/composantCategorie");

// Routes composantCategorie
router.get("", verifyToken, composantCategorieController.getComposantCategories);
router.get("/:id", verifyToken, composantCategorieController.getComposantCategorie);
router.put("/:id",verifyToken, composantCategorieController.updateComposantCategorie);
router.delete("/:id",verifyToken, composantCategorieController.deleteComposantCategorie);
router.post("/add",verifyToken, composantCategorieController.createComposantCategorie);

module.exports = router;