const express = require("express");
const router = express.Router();
const proizvodController = require("../controllers/proizvodController");

router.get("/", proizvodController.dohvatiSve);

module.exports = router;