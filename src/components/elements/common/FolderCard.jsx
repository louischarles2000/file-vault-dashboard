/* eslint-disable react/prop-types */
import {} from 'react'
import { IoIosMore } from 'react-icons/io'
import { CiFolderOn } from 'react-icons/ci'

function FolderCard(props) {
  return (
    <div className={'w-[20%] px-3 rounded-md py-3 pt-[-10px] bg-yellow-100 shadow-md hover:scale-[1.1] hover:mx-2 cursor-pointer ' + props.className}>
      <div className='flex flex-row justify-between items-center mb-2'>
      <div className='bg-white px-2 py-2 rounded-full'>
          <CiFolderOn size={20}/>
      </div>
      <IoIosMore size={15}/>
      </div>
      <p className='text-[#555] font-bold'>{props.name}</p>
      <h2 className='font-bold text-[20px]'>{props.files} Files</h2>
    </div>
  )
}

export default FolderCard