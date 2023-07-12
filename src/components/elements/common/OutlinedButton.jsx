/* eslint-disable react/prop-types */
import {} from 'react'

function OutlinedButton(props) {
  return (
    <button 
      onClick={props.onClick} 
      className={'bg-white flex flex-row text-[#80df9a] items-center py-3 px-3 gap-2 font-bold shadow-md rounded-full ' + props.className}>
      {props.children}
    </button>
  )
}

export default OutlinedButton