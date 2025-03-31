import React from 'react'
import { IoReorderThree } from "react-icons/io5";

const Navbar = () => {

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='h-20 w-5/6 border-none shadow-sm shadow-gray-300 py-3 px-4
         m-5 text-2xl font-bold flex items-center bg-slate-700
         justify-between rounded-xl'>
            <h1>ChatBot</h1>
            <a href="#">
            <IoReorderThree className='h-11 w-11 hover:text-orange-200 transition-all
             border-orange-500 duration-300'/>
            </a>
        </div>
      
    </div>
  )
}

export default Navbar
