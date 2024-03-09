import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";

export default function RentForm() {
  const [carName, setCarName] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [location, setLocation] = useState("");
  const [kms, setKms] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [availableTill, setAvailableTill] = useState("");
  const [url1, setUrl1] = useState(null);
    const [url2, setUrl2] = useState(null);
    const navigate=useNavigate();
    
   


  const user = JSON.parse(localStorage.getItem("user"));


    const handleTimeChange = time => {
        setSelectedTime(time);
      };
  const handleFirstUpload = async (e) => {
    const file = e.target.files[0];
    setImage1(file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploadImage");
    data.append("cloud_name", "du9foikdt");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/du9foikdt/image/upload",
        data
      );
      const cloudData = await res.data;
      setUrl1(cloudData.url);
      console.log(cloudData.url);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSecondUpload = async (e) => {
    const file = e.target.files[0];
    setImage2(file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploadImage");
    data.append("cloud_name", "du9foikdt");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/du9foikdt/image/upload",
        data
      );
      const cloudData = await res.data;
      setUrl2(cloudData.url);
      console.log(cloudData.url);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/listings/listNewCar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carName,
        image1: url1,
        image2: url2,
        location,
        kms,
        hourlyRate,
        dailyRate,
        available: true,
        carOwner: user.fullName,
        carOwnerEmail: user.email,
        carOwnerId: user._id,
        availableTill,
      }),
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      toast.error(data.error);
    } else {
      console.log(data);
      toast.success("Car Listed Successfully");
        navigate("/myCar");
      
    }
  };

  return (

    <div className="">
      <Navbar/>
    <div className="mt-8 mb-4 " >
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-8">

          <p className="mt-1  text-2xl text-center font-bold text-cyan-500 dark:text-gray-400">
            Rental Entry
          </p>

          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-black placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Car Name"
                aria-label="Car Name"
                required
                onChange={(e) => setCarName(e.target.value)}
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Front image of car"
                type="file"
                aria-label="Upload Image"
                multiple
                required
                onChange={handleFirstUpload}
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-black   bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Front image of car"
                type="file"
                aria-label="Upload Image"
                multiple
                required
                onChange={handleSecondUpload}
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-black placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Location"
                aria-label="Location"
                required
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-black placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="number"
                placeholder="Total KMS"
                aria-label="Total KMS"
                required
                onChange={(e) => setKms(e.target.value)}
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-black placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="number"
                placeholder="Hourly Rate"
                aria-label="Price Per Hour"
                required
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-black placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="number"
                placeholder="Daily Rate"
                aria-label="Price Per Day"
                required
                onChange={(e) => setDailyRate(e.target.value)}
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-black placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="datetime-local"
                placeholder="Available Till"
                aria-label="Available Till"
                required
                onChange={(e) => setAvailableTill(e.target.value)}
              />
            </div>
           

          
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-cyan-500 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
               Submit 
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
    </div>
  );
}
