const mongoose = require("mongoose");
const parkSpaceSchema = new mongoose.Schema({
  occupied: {
    type: Boolean,
    default: false,
  },
  carOwner: {
    type: String,
    default: "",
  },
  inTime: {
    type: String,
    default: "",
  },
  outTime: {
    type: String,
    default: "",
  },
  slotNo: {
    type: Number,
  },
});

module.exports = new mongoose.model("parkSpace", parkSpaceSchema);
