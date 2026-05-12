const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middlewares/validate");
const authV = require("../middlewares/validators/authValidator");

router.post(
  "/register",
  authV.authValidation,
  validate,
  authController.register,
);

module.exports = router;
