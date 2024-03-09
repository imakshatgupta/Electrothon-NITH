const express = require("express");
const { claimSuccess } = require("../controllers/nftController.js");

const router = express.Router();

router.route("/claimSuccess").patch(claimSuccess);

module.exports = router;
