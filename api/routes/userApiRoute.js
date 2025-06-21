const express = require("express")
const router = express.Router();
const userController = require("../controlleurs/userApiControleur");
const verifyToken = require("../middlewares/authMiddlewares");


router.get("", verifyToken, userController.getUsers);
router.get("/:id", verifyToken, userController.getUser);
router.put("/:id",verifyToken, userController.updateUser);
router.delete("/:id",verifyToken, userController.deleteUser);
router.post("/register", userController.createUser);
router.post("/login", userController.login);

module.exports = router;