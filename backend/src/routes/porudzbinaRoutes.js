const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const porudzbinaController = require("../controllers/porudzbinaController");

router.post("/", authMiddleware, porudzbinaController.kreiraj);

module.exports = router;