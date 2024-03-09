const express = require ("express");
const {
  loginUser,
  registerUser,
  updatePassword,
  updateProfile,
  getUser,
  addWallet,
} = require("../controllers/userController.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(getUser);
router.route("/updatePassword").post(updatePassword);
router.route("/updateProfile").post(updateProfile);
router.route("/addWallet").post(addWallet);

module.exports=router;