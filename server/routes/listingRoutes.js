const express = require("express");
const {
  listNewCar,
  getAllCar,
  myCar,
  removeCar,
  saveBooking,
  saveWallet,
  getMyBooking,
} = require("../controllers/listingController.js");
const {
  addBooking,
  verifyPayment,
} = require("../controllers/PaymentController.js");

const router = express.Router();

router.route("/listNewCar").post(listNewCar);
router.route("/getAllCar").get(getAllCar);
router.route("/myCar").get(myCar);
router.route("/removeCar").post(removeCar);
router.route("/bookings/addBooking").post(addBooking);
router.route("/bookings/saveBooking").post(saveBooking);
router.route("/bookings/saveWallet").post(saveWallet);
router.route("/verify").post(verifyPayment);
router.route("/getMyBooking").get(getMyBooking);

module.exports = router;
