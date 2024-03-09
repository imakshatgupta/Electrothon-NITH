import React from "react";
import { Link } from "react-router-dom";
import park from "../assets/park.png";
import logo from "../assets/logo.png";
import Step1 from "../assets/Step1.png";
import Step2 from "../assets/Step2.png";
import Step3 from "../assets/Step3.png";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import parkGif from "../assets/dribbble_2.gif"
import parkGif2 from "../assets/ANIM_02.gif"
import pk from "../assets/pk.gif"

const Parking = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <>
      {/* <Navbar/> */}
      <Navbar />
      <br className="border" />
      {/* <Hero/> */}
      <section
        id="home"
        className="flex justify-between items-center px-12 py-6 bg-[rgb(253,186,140)]"
      >
        <div className="flex flex-col flex-1">
          <div className="mb-8">
            <h1 className="font-poppins font-semibold text-6xl text-black leading-snug">
              Discover the <br className="sm:hidden" />
              <span className="text-gradient">Ultimate </span>
              Parking Solution
            </h1>
            <Link
              to="/park"
              className="inline-block mt-4 px-6 py-3 bg-gradient-to-r border hover:bg-gray-700 text-white bg-black rounded-md transition duration-300 "
            >
            For Parking ...
            </Link>
          </div>
          <div>
            <h2 className="font-poppins font-semibold text-3xl leading-snug text-black mb-4">
              Easy Parking Management
            </h2>
            <p className="text-black text-lg">
              Our team of experts ensures a seamless parking experience,
              tailored to your needs. We prioritize secure transactions, low
              fees, and user-friendly interfaces, empowering you to find and
              reserve parking spots hassle-free.
            </p>
          </div>
        </div>
        <div className="flex-1">
          <img src={park} alt="Hero" className="w-[600px] object-contain" />
        </div>
      </section>
      <section className="flex justify-center items-center">
        <div className="border shadow-md">
        <img src={parkGif} className="h-[300px] p-[20px]"/>
        </div>
      </section>
      {/*/ Working */}
      <section className="p-8">
        <div>
          <div className="flex justify-center items-center ">
            <div className="flex flex-col items-center">
              <h2 className="font-poppins font-semibold text-3xl leading-snug text-black mb-2">
                How it works
              </h2>
              <p className="text-center text-lg text-black">
                Our platform is designed to make parking easy and convenient.
                With our user-friendly interface, you can easily find and
                reserve parking spots in your area.
              </p>
            </div>
          </div>
          {/* Single Step */}
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center">
              <img src={Step1} alt="Step One" width={100} height={100} />

              <p className="text-center text-lg text-black">
                Search for parking spots in your area. Our platform provides a
                wide range of options, including public parking lots, private
                garages, and residential parking spaces.
              </p>
            </div>
            <div className="flex w-90 h-96 items-center justify-center">
              <div className="w-1 h-96 bg-[#3f757e]"></div>
            </div>
            <div
              className="flex flex-col
            items-center"
            >
              <img src={Step2} alt="Step One" width={100} height={100} />

              <p className="text-center text-lg text-black">
                Reserve your parking spot. Our platform allows you to book
                parking spots in advance, ensuring that you have a secure place
                to park your vehicle.
              </p>
            </div>
            <div className="flex w-90 h-96 items-center justify-center">
              <div className="w-1 h-96 bg-[#3f757e]"></div>
            </div>
            <div className="flex flex-col items-center">
              <img src={Step3} alt="Step One" width={100} height={100} />
              <p className="text-center text-lg text-black">
                Park your vehicle. Our platform provides detailed instructions
                on how to access your parking spot, ensuring a seamless parking
                experience.
              </p>
            </div>
          </div>
          
        </div>
      </section>
        {/*/ ReasonToLove */}
        {/* Footer */}
        <Footer/>
    </>
  );
};

export default Parking;
