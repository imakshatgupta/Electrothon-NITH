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
  const id = req.body.slotId;
  const carOwnerId = req.body.carOwner;
  const slot = await Slot.findById(id);
  if (slot) {
    slot.occupied = true;
    slot.carOwner = carOwnerId;
    slot.inTime = Date.now();
    slot.save();
    res.status(200).json({
      Success: "Slot Entry Successful!",
    });
  } else {
    res.status(400);
  }
};

const slotExit = async (req, res) => {
    const id = req.body.id;
    const slot = await Slot.findById(id);
    if (slot) {
        slot.occupied = false;
        slot.carOwner = "";
        const inTime = slot.inTime;
        const inTimeInt = parseInt(inTime);
        const totalTime = Date.now() - inTimeInt;
        console.log(totalTime);
        const minutes = Math.floor((totalTime % 3600000) / 60000);
        slot.inTime = "";
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
