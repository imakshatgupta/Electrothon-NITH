const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    carRenter:{
        type:String,
    },
    carName: {
        type: String,
    },
    carImage: {
        type: String,
    },
    timeLeft: {
        type: Number,
    },
});

module.exports = new mongoose.model("bookingDatas", bookingSchema);
