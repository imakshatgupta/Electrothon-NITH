import React from "react";
import { FaSearchLocation, FaCalendarAlt, FaCar } from "react-icons/fa";

const Working = () => {
  return (
    <div className="container mx-auto px-4 py-8 shadow-xl">
      <div className="flex justify-between flex-col items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 leading-snug">
          How Turbo Car Rental Works
        </h1>
        <p className="text-gray-500">
          The proper business solution for your developing business strategies
          and corporation
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <FaSearchLocation className="text-4xl text-orange-300 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">Search Location</h3>
          <p className="text-gray-500">Find the perfect car near you.</p>
        </div>
        <div className="text-center">
          <FaCalendarAlt className="text-4xl text-orange-300 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">Select Date & Time</h3>
          <p className="text-gray-500">Choose your rental duration.</p>
        </div>
        <div className="text-center">
          <FaCar className="text-4xl text-orange-300 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">Make Ride</h3>
          <p className="text-gray-500">Book your car and hit the road.</p>
        </div>
      </div>
    </div>
  );
};

export default Working;
