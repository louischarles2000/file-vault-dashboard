/* eslint-disable react/prop-types */
import { Button } from 'antd'
import {} from 'react'

function MainButton(props) {
  return (
    <Button 
      className={'bg-[#80df9a] disabled:bg-[#ccc] disabled:text-[#eee] disabled:cursor-not-allowed flex flex-row text-white items-center py-4 px-4 gap-2 font-bold shadow-md rounded-md ' + props.className}
      loading={props.loading} 
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
    // <button 
    //   disabled={props.disabled}
    //   className='bg-[#80df9a] disabled:bg-[#ccc] disabled:text-[#eee] disabled:cursor-not-allowed flex flex-row text-white items-center py-2 px-4 gap-2 font-bold shadow-md rounded-md'
    //   >
    //   {props.children}
    // </button>
  )
}

export default MainButton