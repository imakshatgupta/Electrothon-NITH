const Slot = require("../models/parkSpaceModel");

const addSlot = async (req, res) => {
  const { slotNo } = req.body;
  const slot = await Slot.create({
    slotNo,
  });
  if (slot) {
    res.status(201).json({
      Success: "Slot Added Successfully!",
    });
  } else {
    res.status(400);
  }
};

const allSlot = async (req, res) => {
  const slot = await Slot.find();
  if (slot) {
    res.status(200).json(slot);
  } else {
    res.status(400);
  }
};

const slotEntry = async (req, res) => {
  console.log(req.body.slotId);
  try {
    const alreadySlot = await Slot.findOne({ slotNo: req.body.slotId });
    console.log(alreadySlot);
    if (alreadySlot) {
      return res.status(201).json({
        Success: "Already Booked"
      });
    }

    const slot = await Slot.create({
      inTime: Date.now(),
      slotNo: req.body.slotId,
    });

    if (slot) {
      return res.status(201).json({
        Success: "Slot Entry Successful!",
      });
    } else {
      return res.status(400).json({
        Error: "Failed to create slot entry"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      Error: "Internal Server Error"
    });
  }
};


const slotExit = async (req, res) => {
    const id = req.body.id;
    const slot = await Slot.findById({slotNo: id});
    if (slot) {
        const inTime = slot.inTime;
        const inTimeInt = parseInt(inTime);
        const totalTime = Date.now() - inTimeInt;
        console.log(totalTime);
        const minutes = Math.floor((totalTime % 3600000) / 60000);
        slot.inTime = "";
        slot.slotNo = "";
        slot.save();
        res.status(200).json({
        Success: "Slot Exit Successful!",
        minutes: minutes,
        payableAmount: minutes * 1,
        });
    } else {
        res.status(400);
    }
    }

module.exports = {
  addSlot,
  allSlot,
  slotEntry,
  slotExit,
};
