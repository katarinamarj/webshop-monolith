const express = require("express");

const router = express.Router();

const kategorijaController = require("../controllers/kategorijaController");

router.get("/",kategorijaController.dohvatiSve);

module.exports = router;