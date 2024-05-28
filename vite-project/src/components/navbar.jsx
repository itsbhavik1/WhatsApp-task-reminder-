import React from 'react'

const Navbar = () => {
  return (
    <div className="nav flex justify-between bg-green-200 m-3 py-4" >
        <div className="logo">
            <span className='font-bold text-xl mx-7'>Whatsapp Notification sender</span>
        </div>
        <ul className='flex gap-7 mx-8'>
        <li className='cursor-pointer my-px hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer my-px hover:font-bold transition-all'>Bhavik</li>
        </ul>
    </div>
  )
}

export default Navbar
  