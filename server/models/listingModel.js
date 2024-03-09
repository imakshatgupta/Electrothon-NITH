const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
  carName: {
    type: String,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  location: {
    type: String,
  },
  kms: {
    type: String,
  },
  hourlyRate: {
    type: String,
  },
  dailyRate: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  carOwner: {
    type: String,
  },
  carOwnerEmail: {
    type: String,
  },
  carOwnerId: {
    type: String,
  },
  availableTill: {
    type: String,
  },
  onRent: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("listingDatas", listingSchema);
