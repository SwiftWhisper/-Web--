const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middlewares/validate");
const authV = require("../middlewares/validators/authValidator");
const protect = require("../middlewares/protect");
router.post(
  "/register",
  authV.authValidation,
  validate,
  authController.register,
);
router.post("/login", authController.login);
router.get("/me", protect, authController.getMe); // захищений маршрут

module.exports = router;
