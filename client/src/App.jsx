import React from "react";
import Home from "./Pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import RentForm from "./Pages/RentForm";
import CarRent from "./Pages/CarRent.jsx";
import MyCar from "./Pages/myCar.jsx";
import RentalCard from "./Pages/RentalCard.jsx";
import Parking from "./Pages/Parking.jsx";
import Slot from "./Pages/Slot.jsx";
import SlotReader from "./Pages/SlotEntry.jsx";
import SlotEntry from "./Pages/SlotEntry.jsx";
import SlotExit from "./Pages/SlotExit.jsx";
import Admin from "./Pages/Admin.jsx";
import ParkArea from "./Pages/ParkArea.jsx";
import MyBooking from "./Pages/MyBooking.jsx";
import NFTMint from "./Pages/nftMint.jsx";
import ClaimNft from "./Pages/claimNft.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lend" element={<RentForm />} />
        <Route path="/rent" element={<CarRent />} />
        <Route path="/myCar" element={<MyCar />} />
        <Route path='/rental' element={<RentalCard />} />
        <Route path ='/parking' element={<Parking />} />
        <Route path='/park' element={<ParkArea/>}/>
        <Route path ='/slot' element={<Slot />} />
        <Route path ='/slotentry' element={<SlotEntry />} />
        <Route path ='/slotexit' element={<SlotExit />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/myBooking" element={<MyBooking/>} />
        <Route path="/nftMint" element={<NFTMint/>} />
        <Route path="/claimNft" element={<ClaimNft/>} />
      </Routes>
      <ToastContainer/>
    </Router>
  

  </div>
);

export default App;
