/* eslint-disable react/prop-types */
import {} from 'react'

function LinkButton(props) {
  return (
    <div 
      onClick={props.onClick} 
      className={'text-bold hover:underline cursor-pointer text-[#80df9a] ' + props.className}
      >
        {props.title}
    </div>
  )
}

export default LinkButton