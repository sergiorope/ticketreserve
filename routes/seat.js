const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seat");

router.get("/list", seatController.list);
router.put("/update/:id", seatController.update);


module.exports = router;
