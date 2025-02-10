const express = require("express");
const router = express.Router();
const filmController = require("../controllers/film");


router.get("/list", filmController.list);













module.exports = router;