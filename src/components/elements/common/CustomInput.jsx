/* eslint-disable react/prop-types */
import {} from 'react'

function CustomInput({label, placeholder, value, type, onChange, name}) {
  return (
    <div
      className='w-full border-[1px]'>
      <input 
        className='w-full p-2'
        placeholder={placeholder}
        value={value} 
        type={type} 
        onChange={onChange}
        name={name}/>
    </div>
  )
}

export default CustomInput