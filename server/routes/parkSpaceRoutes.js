const express = require ("express");
const {
  addSlot,
  allSlot,
  slotEntry,
  slotExit,
} = require("../controllers/parkSpaceController.js");

const router = express.Router();

router.route("/addSlot").post(addSlot);
router.route("/allSlot").get(allSlot);
router.route("/slotEntry").post(slotEntry);
router.route("/slotExit").post(slotExit);

module.exports=router;