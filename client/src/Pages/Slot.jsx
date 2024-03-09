import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import slotsData from "./data.json";

const Slot = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [price, setPrice] = useState("");
  const [freeSlot, setFreeSlot] = useState(0);
  const [incomingSlot, setIncomingSlot] = useState();

  useEffect(() => {
    getSlot();
  }, [incomingSlot]);

  const getSlot = async () => {
    try {
      const response = await axios.get("http://192.168.163.177:5000/update");
      const data = response.data.slots;
      const currentPrice = response.data.price;
      const freeSlot = response.data.freeslots; 
      console.log(data);
      setFreeSlot(freeSlot);
      setPrice(currentPrice);
      setIncomingSlot(data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  useEffect(() => {
    if (incomingSlot && incomingSlot.length > 0) {
      const updatedSlots = slotsData.slots.map((slot) => {
        const matchingSlot = incomingSlot.find((s) => s === slot.slotNo);
        if (matchingSlot) {
          return { ...slot, isFree: !matchingSlot.isFree };
        }
        return slot;
      });
      setSlots(updatedSlots);
    }
  }, [incomingSlot]);

  const handleSlotBook = (slotNo) => {
    const selectedSlot = slots.find((slot) => slot.slotNo === slotNo);
    if (selectedSlot && selectedSlot.isFree) {
      setSelectedSlot(selectedSlot);
      setIsModalOpen(true);
    } else {
      toast.error("This slot is already occupied. Please select another slot.");
    }
  };

  const confirmSlotBooking = () => {
    if (!selectedSlot) {
      console.error("No slot selected for booking");
      toast.error("No slot selected for booking");
      return;
    }

    const tempBookingData = {
      slotId: selectedSlot.slotNo,
    };

    setBookingData(tempBookingData);
    setIsModalOpen(false);
  };

  const cancelSlotBooking = () => {
    setIsModalOpen(false);
  };

  return (
<<<<<<< HEAD
<div className="container mx-auto px-4">
  <Navbar />
  <h2 className="text-5xl font-bold text-center p-[100px] mb-4">Slots</h2>
  <h3>Current Price for Slot: {price}</h3>
  <h3>Free Slots: {freeSlot}</h3>
  <div className="grid grid-cols-6 gap-4">
    {[...Array(6)].map((_, colIndex) => (
      <div key={colIndex} className="grid grid-cols-1 gap-4">
        {slots.slice(colIndex * 10, (colIndex + 1) * 10).map((slot, index) => (
=======
    <div className="container mx-auto px-4">
      <Navbar />
      <h2 className="text-5xl font-bold text-center p-[10px] mb-4">Slots</h2>
      <div className="flex justify-evenly items-center p-[20px]">
        <h3>
          <span className="font-bold"> Current Price for Slot</span> : Rs.{" "}
          {price}/hr
        </h3>
        <h3>
          <span className="font-bold">Free Slots </span> : {freeSlot}
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4">
        {slots.map((slot) => (
>>>>>>> 80772bde353a8241605275d4fb7479420989fe67
          <div
            key={slot.slotNo}
            onClick={() => handleSlotBook(slot.slotNo)}
            className={`border rounded-md p-4 cursor-pointer ${
              slot.isFree ? "bg-green-500" : "bg-red-400"
            }`}
          >
<<<<<<< HEAD
            <p className="font-bold text-[50px] text-center">
              {(colIndex * 12) + index + 1}
            </p>
=======
            <p className="font-bold text-[20px] text-center">{slot.slotNo}</p>
>>>>>>> 80772bde353a8241605275d4fb7479420989fe67
          </div>
        ))}
      </div>
    ))}
  </div>
  {/* Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-lg font-semibold mb-4">Confirm Slot Booking</p>
        <p>Are you sure you want to book slot {selectedSlot.slotNo}?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={confirmSlotBooking}
            className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md"
          >
            Yes
          </button>
          <button
            onClick={cancelSlotBooking}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )}
  {/* QR Code Modal */}
  {bookingData && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-center items-center">
        <p className="text-3xl font-semibold mb-4 leading-snug">
          Booking Successful!
        </p>
        <QRCode
          value={JSON.stringify(bookingData)}
          style={{ width: "200px", height: "200px" }}
        />
        <button
          onClick={() => setBookingData(null)}
          className="mt-4  px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  )}
</div>
);


  
};

export default Slot;
