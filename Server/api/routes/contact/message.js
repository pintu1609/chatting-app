const router = require("express").Router();
const {
  getList,
  create,
  deleteMessage,
} = require("../../controllers/contact/message");

const { verifyAccessToken } = require("../../middlewares/auth");

const validate = require("../../middlewares/validator");

const messageValidator = require("../../validators/contact/message"); // Validation Schema

router.route("/").post(verifyAccessToken,validate(messageValidator.createSchema), create);
router.route("/").get(verifyAccessToken, getList);

// router.route("/").delete(verifyAccessToken, deleteMessage);

module.exports = router;
