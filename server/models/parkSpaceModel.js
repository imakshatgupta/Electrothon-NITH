const mongoose = require("mongoose");
const parkSpaceSchema = new mongoose.Schema({
  inTime: {
    type: String,
    default: "",
  },
  slotNo: {
    type: Number,
  },
});

module.exports = new mongoose.model("parkSpace", parkSpaceSchema);
