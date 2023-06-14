import { useState } from 'react'
import { AiOutlineSearch, AiOutlineMore, AiOutlineCloudUpload, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BsFolderPlus, BsFilter } from 'react-icons/bs' 
import MainButton from '../../elements/common/MainButton'
import OutlinedButton from '../../elements/common/OutlinedButton'

function Navbar() {
  const [ascending, setAscending] = useState([false]);
  const onSort = () => {
    setAscending(!ascending)
  }
  return (
    <div className='flex justify-between w-full px-8 py-5 align-middle'>
      <div className='flex mr-[2rem] w-[100%] align-middle flex-row bg-white rounded-full text-[14px] px-4 py-2 shadow-md text-[#ccc] items-center'>
        <AiOutlineSearch className=' top-3 text-xl'/>
        <input placeholder='Search your files' 
          className='w-full pl-2 flex-1 outline-none placeholder-slate-300 text-[14px] text-[#555]'/>
      </div>
      <div className='gap-5 flex flex-row items-center'>
        <MainButton>
          <AiOutlineCloudUpload size={20}/>
          Upload
        </MainButton>
        <OutlinedButton onClick={onSort}>
          {ascending ? <AiOutlineSortAscending size={20}/> : <AiOutlineSortDescending size={20}/>}
        </OutlinedButton>
        <OutlinedButton onClick={onSort}>
          <BsFolderPlus size={20}/>
        </OutlinedButton>        
        <OutlinedButton onClick={onSort}>
          <BsFilter size={20}/>
        </OutlinedButton>      
        <OutlinedButton onClick={onSort}>
          <AiOutlineMore size={20}/>
        </OutlinedButton>
        
      </div>
    </div>
  )
}

export default Navbar