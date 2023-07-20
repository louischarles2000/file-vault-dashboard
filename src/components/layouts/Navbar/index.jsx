import { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch, AiOutlineMore, AiOutlineCloudUpload, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BsFolderPlus, BsFilter } from 'react-icons/bs' 
import MainButton from '../../elements/common/MainButton'
import OutlinedButton from '../../elements/common/OutlinedButton'
import { Collapse, Upload } from 'antd'
import { FilesContext } from '../../../contexts/Files'
import NavBarSkel from '../../elements/skeletons/NavBar'
import FileUpload from '../../screens/MyFiles/components/FileUpload'
import NewFolder from '../../screens/MyFiles/components/CreateFolder'
import SearchSpace from './SearchSpace'


function Navbar() {
  const { setCreatingFolder, loadingDashboard, setSelectedFile, selectedFile } = useContext(FilesContext);
  const [ascending, setAscending] = useState([false]);

  // useEffect(() => {
  //   console.log(fileList)
  // }, [fileList])

  const onSort = () => {
    setAscending(!ascending)
  }
  const handleNewFolder = () => {
    setCreatingFolder(true)
  }

  const handleFileChange = async (e) => {
    // const _file = e.target.files[0];
    const _file = await e.file.originFileObj;
    console.log(_file)
    setSelectedFile(_file);
  }

  if(loadingDashboard) return <NavBarSkel />
  return (
    <div className='flex justify-between w-full px-8 py-5 align-middle'>
      
      <div className='flex mr-[2rem] max-h-[50px] w-[100%] max-w-[500px] align-middle flex-row bg-white rounded-full text-[14px] px-4 py-2 shadow-md text-[#ccc] items-center'>
        <AiOutlineSearch className=' top-3 text-xl'/>
        <input placeholder='Search your files and folders' 
          className='w-full pl-2 flex-1 outline-none placeholder-slate-300 text-[14px] text-[#555]'/>
      </div>
      <SearchSpace />
      <div className='gap-5 flex flex-row items-center'>
        <FileUpload />
        <NewFolder />
        {/* <input type='file' onChange={handleFileChange}/> */}
        <Upload className='' onChange={handleFileChange} showUploadList={false}>
          <MainButton>
            <AiOutlineCloudUpload size={20}/>
            Upload
          </MainButton>
        </Upload>
        <OutlinedButton onClick={onSort}>
          {ascending ? <AiOutlineSortAscending size={20}/> : <AiOutlineSortDescending size={20}/>}
        </OutlinedButton>
        <OutlinedButton onClick={handleNewFolder}>
          <BsFolderPlus size={20}/>
        </OutlinedButton>        
        {/* <OutlinedButton onClick={onSort}>
          <BsFilter size={20}/>
        </OutlinedButton>       */}
        <OutlinedButton onClick={onSort}>
          <AiOutlineMore size={20}/>
        </OutlinedButton>
        
      </div>
    </div>
  )
}

export default Navbar