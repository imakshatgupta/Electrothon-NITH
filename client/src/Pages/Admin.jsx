import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Link to='/slotentry' className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-[30px] py-2 px-4 rounded mb-4'>
        SlotEntry
      </Link>
      <Link to='/slotexit' className='bg-green-500 hover:bg-green-700 text-white text-[30px] font-bold py-2 px-4 rounded'>
        SlotExit
      </Link>
    </div>
  )
}

export default Admin
