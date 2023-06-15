/* eslint-disable react/prop-types */
import {} from 'react'

function LinkButton(props) {
  return (
    <h2 className='text-bold hover:underline cursor-pointer text-[#80df9a]'>
        {props.title}
    </h2>
  )
}

export default LinkButton