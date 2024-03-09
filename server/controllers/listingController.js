const List = require("../models/listingModel.js");
const User = require("../models/userModel.js");
const Booking = require("../models/bookingModel.js");

const listNewCar = async (req, res) => {
  const {
    carName,
    image1,
    image2,
    location,
    kms,
    hourlyRate,
    dailyRate,
    available,
    carOwner,
    carOwnerEmail,
    carOwnerId,
    availableTill,
  } = req.body;

  const car = await List.create({
    carName,
    image1,
    image2,
    location,
    kms,
    hourlyRate,
    dailyRate,
    available,
    carOwner,
    carOwnerEmail,
    carOwnerId,
    availableTill,
  });

  if (car) {
    res.status(201).json({
      Success: "Car Listed Successfully!",
    });
  } else {
    res.status(400);
  }
};

const getAllCar = async (req, res) => {
  try {
    const cars = await List.find({ available: true, onRent: false });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const myCar = async (req, res) => {
  try {
    const carOwnerEmail = req.headers["x-auth-token"];
    const cars = await List.find({ carOwnerEmail });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeCar = async (req, res) => {
  try {
    const id = req.body.id;
    const car = await List.findById(id);
    if (car) {
      if (car.available) {
        car.available = false;
      } else {
        car.available = true;
      }
      await car.save();
      res
        .status(200)
        .json({
          message: "Car updated successfully",
          available: car.available,
        });
    } else {
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const saveBooking = async (req, res) => {
  const { id, carOwnerId, rentPrice, carRenterId, timeLeft } = req.body;
  const booking = await List.findById(id);
  booking.onRent = true;
  const user = await User.findById(carOwnerId);
  const previousAmount = user.amountEarned;
  user.amountEarned = rentPrice + previousAmount;

  console.log(timeLeft, Date.now());
  console.log(timeLeft - Date.now());
  const time = timeLeft 
  console.log(time);
  const myBooking = await Booking.create({
    carRenter: carRenterId,
    carName: booking.carName,
    carImage: booking.image1,
    timeLeft: time,
  });

  await user.save();
  await booking.save();
  await myBooking.save();

  res.status(201).json({
    message: "Booking Saved",
  });
};

const saveWallet = async (req, res) => {
  const { id, carOwnerId, cryptoAmount } = req.body;
  const booking = await List.findById(id);
  booking.onRent = true;
  const user = await User.findById(carOwnerId);
  const previousAmount = user.cryptoAmount;
  user.cryptoAmount = cryptoAmount + previousAmount;
  await user.save();
  await booking.save();
  res.status(201).json({
    message: "Booking Saved",
  });
};

const getMyBooking = async (req, res) => {  
  try {
    const carRenter = req.headers["x-auth-token"];
    const bookings = await Booking.find({ carRenter });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listNewCar,
  getAllCar,
  myCar,
  removeCar,
  saveBooking,
  saveWallet,
  getMyBooking,
};
