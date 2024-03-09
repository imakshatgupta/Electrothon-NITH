import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";

const MyBooking = () => {
  const [bookingInfo, setBookingInfo] = useState(null);
  const [timeLeft,setTimeLeft] = useState(0);

  useEffect(() => {
    const getMyBooking = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const response = await fetch(
          "http://localhost:8000/listings/getMyBooking",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": user._id,
            },
          }
        );

        const data = await response.json();
        if (data.length > 0) {
          setBookingInfo(data[0]);
          const left = Math.floor((data[0].timeLeft - Date.now()) / 3600000);
          setTimeLeft(left);
          console.log(left)
        } else {
          console.log("No booking found for the user.");
        }
      } else {
        console.log("User or token not found in local storage.");
        toast.error("User not found");
      }
    };

    getMyBooking();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold mb-4">My Booking</h1>
        {bookingInfo && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg mb-2">Car Name: {bookingInfo.carName}</p>
            <div className="mb-2">
              <img
                className="w-[200px] rounded-lg"
                src={bookingInfo.carImage}
                alt={bookingInfo.carName}
              />
            </div>
            <p className="text-lg">
              You have to return in {timeLeft} hours
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBooking;
