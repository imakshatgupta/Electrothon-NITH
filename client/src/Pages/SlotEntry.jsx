import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const SlotEntry = () => {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isDataProcessed, setIsDataProcessed] = useState(false);

  const redirect = async () => {
    toast.success("Slot Entry Successful");
    history("/admin");
    window.location.reload();
  };

  const qrData = async (text, result) => {
    if (!isDataProcessed) {
      setIsDataProcessed(true);
      const slotBooking = JSON.parse(text);
      try {
        const slotEntryResponse = await axios.post("http://localhost:8000/parking/slotEntry", {
          slotId: slotBooking.slotId,
        });
        console.log(slotEntryResponse.data);
        // await redirect();
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="h-[400px] w-[400px] m-auto mt-[200px]">
      <Scanner
        components={{
          audio: false,
          video: false,
        }}
        options={{
          delayBetweenScanAttempts: 1000,
          delayBetweenScanSuccess: 10000,
        }}
        onResult={(text, result) => qrData(text, result)}
        onError={(error) => console.log(error?.message)}
      />
    </div>
  );
};

export default SlotEntry;
