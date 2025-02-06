const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");


router.post("/register", userController.create);
router.get("/list", userController.list);
router.get("/:id", userController.getById);









module.exports = router;