const express = require("express");
const router = express.Router();
const projectionController = require("../controllers/projection");

router.get("/list", projectionController.list);

module.exports = router;
