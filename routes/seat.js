const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seat");

router.get("/list", seatController.list);
router.get("/list-by-screen/:id_Sala", seatController.listByScreen);
router.put("/update/:id", seatController.update);


module.exports = router;
