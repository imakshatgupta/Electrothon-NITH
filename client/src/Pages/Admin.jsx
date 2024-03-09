import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Admin = () => {
  return (
    <div>
    <Navbar/>
    <div className='flex  items-center justify-around h-screen'>
      <Link to='/slotentry' className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-[30px] py-2 px-4 rounded mb-4'>
        SlotEntry
      </Link>
      <Link to='/slotexit' className='bg-green-500 hover:bg-green-700 text-white text-[30px] font-bold py-2 px-4 rounded mb-4'>
        SlotExit
      </Link>
    </div>
    </div>
  )
}

export default Admin
