const express = require("express");
const router = express.Router();
const korpaController = require("../controllers/korpaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/dodaj", authMiddleware, korpaController.dodajUKorpu); 

router.get("/", authMiddleware, korpaController.dohvatiKorpu);

router.delete("/:stavkaKorpeId", authMiddleware, korpaController.obrisiStavku);

module.exports = router;