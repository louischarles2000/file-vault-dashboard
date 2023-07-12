// import { useState } from 'react'
import maintenance from './assets/maintenance.webp'
import './App.css'

function Maintenance() {
//   const [count, setCount] = useState(0)

  return (
    <div className='w-full h-full text-center py-8 bg-[#000300]'>
      <div className='flex justify-center'>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img src={maintenance} className="w-[144px] h-[144px] my-6" alt="React logo" />
        </a>
      </div>
      <h1 className='text-[#80df9a] text-[51px] font-bold my-4'>FileVault.</h1>
      <p className="text-[#ccc]">
       THE FILEVAULT DASHBOARD IS UNDER MAINTENANCE...
      </p>
      <div className="my-4 p-2">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <p className='text-[#fff]'>
          {`We'll be up and running in a minute 😎`}
        </p>
      </div>
    </div>
  )
}

export default Maintenance
