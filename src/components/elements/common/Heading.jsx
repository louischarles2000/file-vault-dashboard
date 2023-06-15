/* eslint-disable react/prop-types */
import {} from 'react'

function Heading(props) {
  return (
    <div className='text-2xl font-black'>
      {props.children} 
    </div>
  )
}

export default Heading