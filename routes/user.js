const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const check = require("../middleware/auth")


router.post("/register", userController.register);
router.put("/update", check.auth, userController.update);
router.post("/login", userController.login);












module.exports = router;