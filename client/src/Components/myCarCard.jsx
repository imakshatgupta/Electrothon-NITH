import React from 'react';
import { Carousel } from 'flowbite-react';
import BookingModal from './BookingModal';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';



const Card = ({ id,carName, ownerName, kms, image1, image2, available, availableTill, dailyRate, hourlyRate, location,rent }) => {
 
  const [caravailable, setCarAvailable] = useState(available);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = async(id) => {
    console.log(id);

    const res=await axios.post("http://localhost:8000/listings/removeCar",{id:id},{
      headers:{
        "Content-Type":"application/json",
        "x-auth-token":user.email
      }
    });
    console.log(res.data.available);
    if (res.data.available !== undefined) {
      setCarAvailable(res.data.available);
      toast.success("Changes Saved Successfully");
    }
    if(available){

    }
    
    }
  
  
  return (
    <div className="flex justify-center p-3">
      <div className="max-w-lg rounded-lg  border border-gray-200 shadow-lg bg-white text-black">
        <div className="relative w-full h-40">
          <Carousel slideInterval={3000} >
            <img src={image1} alt="Car" className="w-full h-full object-cover" />
            <img src={image2} alt="Car" className="w-full h-full object-cover" />
          </Carousel>
        </div>
        <div className="p-4 ">
          <h1 className="text-center text-2xl font-bold mb-2">{carName}</h1>
          <hr />
          <div className="flex justify-between pt-3 mb-2">
          <div>
              <p className="text-[15px] font-extrabold">{ownerName}</p>
              <p className="text-[12px]"><span className="font-bold">Rate:</span> {hourlyRate}/hr</p>
              <p className="text-[12px]"><span className="font-bold">Kms:</span> {kms}</p>
            </div>
            <div>
              <p className="text-[12px]"><span className="font-bold">Location:</span> {location}</p>
              <p className="text-[12px]"><span className="font-bold">Day Rate:</span> {dailyRate}/day</p>
              <p className="text-[12px]"><span className="font-bold">Available Till:</span> {availableTill}</p>
            </div>
          </div>
          {!rent?(
          <button className='bg-white text-center ml-8 mt-2 p-1 rounded-md' onClick={() => handleClick(id)}>{caravailable ? "Remove from List" : "Add in List"}</button>
          ):(
            <h1 className='font-bold text-lg text-white'>
              Your Car in on Rent
            </h1>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default Card;
