import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { to } from "@react-spring/web";
import { toast } from "react-toastify";


const SlotEntry = () => {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const redirect = async () => {
    toast.success("Slot Entry Successfull");
    history("/admin");
    window.location.reload();
  };

  const qrData = async (text) => {
    const slotBooking = JSON.parse(text);
    const slotEntry = await fetch("http://localhost:8000/parking/slotEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slotId: slotBooking.slotId,
        carOwner: user._id,
      }),
    });
    const data = await slotEntry.json();
    console.log(data);
    await redirect();
  };
  return (
    <div className="h-[400px] w-[400px] m-auto mt-[200px]">
      <Scanner
        components={{
          audio: false,
          video: false,
        }}
        options={
          { 
           delayBetweenScanAttempts: 1000,
            delayBetweenScanSuccess: 10000,
          }
        }
        onResult={(text, result) => qrData(text , result)}
        onError={(error) => console.log(error?.message)}
      />
    </div>
  );
};

export default SlotEntry;
