import {  } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

function Navbar() {
  return (
    <div className='flex justify-between w-full px-8 py-5 align-middle'>
      <div className='flex mr-[5rem] w-[50%] align-middle flex-row bg-white rounded-full text-[14px] px-4 py-2 shadow-md text-[#ccc]'>
        <AiOutlineSearch className=' top-3 text-xl'/>
        <input placeholder='Search your files' 
          className='w-full pl-2 flex-1 outline-none placeholder-slate-300 text-[14px] text-[#555]'/>
      </div>
      <div>
        <button>One</button>
        <button>Two</button>
        <button>Three</button>
      </div>
    </div>
  )
}

export default Navbar