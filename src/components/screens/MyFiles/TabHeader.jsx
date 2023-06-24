/* eslint-disable react/prop-types */
  import { } from 'react'
  import { FaFolder } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'

function TabHeader(props) {
  const onClickPath = (index) => {
    if(!props.reset) return;
    props.reset(index);
  }
  return (
    <div className='flex flex-row items-center gap-2 cursor-pointer'>
      {props.header ? 
      <FaFolder color='#555' size={20}/> :
      <AiFillHome color='#555' size={20}/>
      }
      {(props.title && (!props.path || props.path.length < 1)) && 
        <p className='font-bold text-[#555]'>{props.title}</p>
      }
      {props.path && props.path.map((p, i) => (
        <div 
          key={i} 
          className='flex flex-row items-center gap-2'
          onClick={() => onClickPath(i)}
          > 
          <IoIosArrowForward color='#757575' size={18}/>
          <p className='font-bold text-[#555]'>{p.name}</p>
        </div>
      ))}
    </div>
  )
}

export default TabHeader