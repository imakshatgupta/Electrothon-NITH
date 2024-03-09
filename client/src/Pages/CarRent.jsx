import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const CarRent = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    try {
      const res = await fetch("http://localhost:8000/listings/getAllCar");
      const data = await res.json();
      setCars(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <h1 className="text-4xl text-black font-bold p-8 text-center">Available Cars for Rent</h1>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-6">
      {cars.map((car) => (
        <Card
        key={car._id}
        carName={car.carName}
        ownerName={car.carOwner}
        dailyRate={car.dailyRate}
        hourlyRate={car.hourlyRate}
        kms={car.kms}
        image1={car.image1} 
        image2={car.image2} 
        location={car.location}
        available={car.available}
        availableTill={car.availableTill}
        carOwnerId={car.carOwnerId}
        id={car._id}
        />
        ))}
    </div>
    <Footer/>
        </>
  );
};

export default CarRent;
