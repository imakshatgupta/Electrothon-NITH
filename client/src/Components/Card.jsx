import { Carousel } from "flowbite-react";
import BookingModal from "./BookingModal";



const Card = ({ id,carName,carOwnerId, ownerName, kms, image1, image2, available, availableTill, dailyRate, hourlyRate, location }) => {  
  return (
    <div className="flex justify-center p-3">
      <div className="max-w-lg rounded-lg  border border-gray-200 shadow-lg bg-white text-black">
        <div className="relative w-full h-40">
          <Carousel slideInterval={3000}>
            <img
              src={image1}
              alt="Car"
              className="w-full h-full object-cover"
            />
            <img
              src={image2}
              alt="Car"
              className="w-full h-full object-cover"
            />
          </Carousel>
        </div>
        <div className="p-4 ">
          <h1 className="text-center text-2xl font-bold mb-2">{carName}</h1>
          <hr />
          <div className="flex justify-between items-center pt-3 mb-2">
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
          <BookingModal
            availableTill={availableTill}
            dailyRate={dailyRate}
            hourlyRate={hourlyRate}
            carOwnerId={carOwnerId}
            id={id}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
