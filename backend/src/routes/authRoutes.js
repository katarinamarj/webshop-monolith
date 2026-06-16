const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/registracija", authController.registracija);

router.post("/prijava", authController.prijava);

router.post("/logout", authController.logout);

module.exports = router;