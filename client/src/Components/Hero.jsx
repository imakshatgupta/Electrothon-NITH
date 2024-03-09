import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/Hero.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="flex justify-between items-center  bg-[rgb(253,186,140)] p-[100px] pb-[50px] shadow-md"
    >
      <div className="flex flex-col flex-1">
        <div className="mb-8">
          <h1 className="font-poppins font-semibold  text-6xl text-black leading-snug">
            Discover the <br className="sm:hidden" />
            <span className="text-gradient">Ultimate </span>
            Car Rental Experience
          </h1>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r border hover:bg-gray-700 text-white bg-black rounded-md transition duration-300 "
            >
            Learn More
          </Link>
        </div>
        <div>
          <h2 className="font-poppins font-semibold text-3xl leading-snug text-black mb-4">
            Easy Payment Methods
          </h2>
          <p className="text-black text-lg">
            Our team of experts ensures a seamless payment experience, tailored
            to your needs. We prioritize secure transactions, low fees, and
            user-friendly interfaces, empowering you to book and pay for your
            car rental or parking spot hassle-free.
          </p>
        </div>
      </div>
      <div className="flex-1">
        <img src={hero} alt="Hero" className="w-full" />
      </div>
    </section>
  );
};

export default Hero;
