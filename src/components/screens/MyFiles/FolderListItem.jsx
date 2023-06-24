/* eslint-disable react/prop-types */
import{} from 'react'
import { FaFolder } from 'react-icons/fa'

function FolderListItem(props) {
  return (
    <div
      // onClick={props.onClick}
      onDoubleClick={props.onClick}
      className='flex flex-row items-center gap-2 cursor-pointer pl-2 py-1 hover:bg-slate-200'>
      <FaFolder color='#80df9a' size={18}/>
      <p className='font-bold text-[#555]'>{props.name}</p>
    </div>
  )
}

export default FolderListItem