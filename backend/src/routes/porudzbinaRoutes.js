const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const porudzbinaController = require("../controllers/porudzbinaController");

router.post("/", authMiddleware, porudzbinaController.kreiraj);

router.get("/", authMiddleware, porudzbinaController.mojePorudzbine);

router.get("/:id", authMiddleware, porudzbinaController.detalji);

module.exports = router;