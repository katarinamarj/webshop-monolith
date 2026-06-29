const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const porudzbinaController = require("../controllers/porudzbinaController");

router.post("/", authMiddleware, porudzbinaController.kreiraj);

router.get("/", authMiddleware, porudzbinaController.mojePorudzbine);

router.get("/admin", authMiddleware, porudzbinaController.dohvatiSve);

router.get("/:id", authMiddleware, porudzbinaController.detalji);

router.put("/:id/status", authMiddleware, porudzbinaController.promeniStatus);

module.exports = router;