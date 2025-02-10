const express = require("express");
const router = express.Router();
const screenController = require("../controllers/screen");



router.get("/list", screenController.list);













module.exports = router;