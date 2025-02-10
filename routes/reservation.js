const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation");

router.get("/list", reservationController.list);
router.post("/create", reservationController.create);


module.exports = router;
