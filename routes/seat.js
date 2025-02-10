const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seat");

router.get("/list", seatController.list);

module.exports = router;
