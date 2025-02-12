const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation");
const check = require("../middleware/auth");

router.get("/list", check.auth, reservationController.list);
router.post("/create",check.auth, reservationController.create);
router.put("/update/:id", check.auth, reservationController.update);
router.delete("/delete/:id", check.auth, reservationController.eliminacion);




module.exports = router;
