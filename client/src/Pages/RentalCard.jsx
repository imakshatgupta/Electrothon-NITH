import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default function RentalCard() {
  return (
    <div>
        <Navbar/>
        <h1 className='text-4xl flex justify-center font-bold leading-snug text-black mt-8'>"Lend or Rent: Choose Your Car Adventure"</h1>
<div className='flex justify-around mt-16  '>
<div class="w-80  border cursor-pointer hover:opacity-90 shadow-lg border-gray-200 rounded-lg ">
    <a href="#">
        <img class="rounded-t-lg h-48" src="https://images.ctfassets.net/2sam6k0rncvg/5IrIwFixQJSc5tLR2lCDzX/0e130341718ba9123e5ec0c5f4ab7526/car-lease-vs-car-loan.png" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-black ">Lend your Vehicle</h5>
        </a>
        <h1 className='text-black mb-4'>"Monetize your idle car by listing it on our platform for others to rent, earning you extra income effortlessly."</h1>
        <Link to="/lend" class="inline-flex items-center  px-3 py-2 text-sm font-medium text-center text-black rounded-lg border border:bg-black hover:bg-gray-200 focus:ring-4 focus:outline-none">
            Lend
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>
    </div>
</div>
<div class="w-80 bg-white border cursor-pointer hover:opacity-90 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg w-full h-48" src="https://img.freepik.com/free-vector/car-rental-concept-illustration_114360-9267.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709337600&semt=ais" alt="" />
    </a>
    <div class="p-5 border shadow-lg">
        <Link to=''>
            <h5 class="mb-2 text-2xl  w-96 font-bold tracking-tight text-black dark:text-white">Rent a Vehicle</h5>
        </Link>
        <h1 className='text-black mb-4'>"Explore a wide range of vehicles available for rent, with flexible options to suit your needs and budget."
</h1>
        <Link to='/rent' class="inline-flex  items-center px-3 py-2 text-sm font-medium text-center border text-black rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
           Rent
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>
    </div>
</div>

</div>



      
    </div>
  )
}
