/* eslint-disable react/prop-types */
import {} from 'react'

function MainButton(props) {
  return (
    <button className='bg-[#80df9a] flex flex-row text-white items-center py-2 px-4 gap-2 font-bold shadow-md rounded-md'>
      {props.children}
    </button>
  )
}

export default MainButton