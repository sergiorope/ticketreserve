const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const check = require("../middleware/auth")


router.post("/register", userController.register);
router.get("/list", userController.list);
router.put("/update", check.auth, userController.update);
router.get("/get-user", check.auth, userController.getUser); 
router.post("/login", userController.login);












module.exports = router;