import { useEffect } from "react";
import { useState } from "react";
import Card from "../Components/myCarCard";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const MyCar = () => {
  const [cars, setCars] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [account, setAccount] = useState("");

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    const res = await fetch("http://localhost:8000/listings/myCar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": user.email,
      },
    });
    const data = await res.json();
    setCars(data);
    console.log(data);
  };

  const handleConnect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const res = await fetch("http://localhost:8000/users/addWallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": user._id,
      },
      body: JSON.stringify({ wallet: accounts[0] }),
    });
    const data = await res.json();
    console.log(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    setAccount(accounts[0]);
  };

  return (
    <>
    <Navbar/>
      {user.wallet || account ? (
        <div className="flex justify-between p-3 border">
          <Link to='/myBooking' className="text-left border-[2px] rounded p-2 bg-black text-white">My Bookings</Link>
          <h1 className="text-right content-center">Wallet Address : {user.wallet || account}</h1>
        </div>
        ) : (
          <p className="text-right border p-4">
          <button className="" onClick={handleConnect}>Connect Wallet</button>
          </p>
          )}
    <div className="flex justify-evenly pt-4 items-center">
      <h3 className="text-[20px] font-bold">Amount Earned via UPI<br /><span className="ml-[65px]">{user.amountEarned}</span>  Rs.</h3>
      <h3 className="text-[20px] font-bold">Amount Earned via Crypto<br /><span className="ml-[65px]">{user.cryptoAmount}</span>  MATIC</h3>
      </div>
      <h1 className="text-4xl text-center font-bold p-10">My Cars</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-12">
        {cars.map((car) => (
          <Card
            key={car._id}
            carName={car.carName}
            ownerName={car.carOwner}
            carOwnerId={car.carOwnerId}
            dailyRate={car.dailyRate}
            hourlyRate={car.hourlyRate}
            kms={car.kms}
            image1={car.image1}
            image2={car.image2}
            location={car.location}
            available={car.available}
            availableTill={car.availableTill}
            id={car._id}
            rent={car.onRent}
          />
        ))}
      </div>
    </>
  );
};

export default MyCar;
