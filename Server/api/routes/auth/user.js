const router = require("express").Router();
const {
  onBoarding,
  login,
  logout,
  getUser,
} = require("../../controllers/auth/user");

const { verifyAccessToken } = require("../../middlewares/auth");

const validate = require("../../middlewares/validator");

const userValidator = require("../../validators/auth/user"); // Validation Schema

router.route("/signup").post(validate(userValidator.addUser), onBoarding);
router.route("/login").post(validate(userValidator.loginSchema), login);
router.route("/").get(verifyAccessToken, getUser);

router.route("/logout").delete(verifyAccessToken, logout);

module.exports = router;
