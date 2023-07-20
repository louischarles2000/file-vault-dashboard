/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import Heading from '../../elements/common/Heading'
import CardDiv from '../../elements/common/CardDiv'
import { CiImageOn, CiFolderOn } from 'react-icons/ci'
import { IoIosMore } from 'react-icons/io'
import { AiOutlineArrowRight, AiOutlinePlayCircle } from 'react-icons/ai'
// import { ImFilesEmpty } from 'react-icons/im'
import { Divider, Progress } from 'antd'
import { _convertBits } from '../../../Utils/functions'
import { BITS_IN_GB } from '../../../Utils/data'
import { AuthContext } from '../../../contexts/Auth'

function Overview(props) {
  const { auth } = useContext(AuthContext);
  const [ files, setFiles ] = useState([
    {
      type: 'Documents',
      files: 0,
      size: '234 MB',
      max: 1,
      bg: 'bg-red-100',
      barBg: '',
      icon: <CiFolderOn size={15}/>,
      progress: 15,
      progressColor: 'red'
    },
    {
      type: 'Images',
      files: 0,
      size: '90 MB',
      max: 1,
      bg: ' bg-slate-100',
      barBg: '',
      icon: <CiImageOn size={15}/>,
      progress: 20,
      progressColor: 'blue'
    },
    {
      type: 'Videos',
      files: 18,
      size: '400 MB',
      max: 1,
      bg: 'bg-green-100',
      barBg: '',
      icon: <AiOutlinePlayCircle size={15}/>,
      progress: 40,
      progressColor: 'green'
    }
  ])
  useEffect(() => {
    if(props.overview){
      const _overview = props.overview;
      const arr = [...files];
      const _files = arr.map(item => {
        switch(item.type){
          case "Images":
            return {
              ...item,
              files: _overview.images.files,
              size: _convertBits(_overview.images.size),
              progress: (_overview.images.size / BITS_IN_GB) * 100
            };
          case "Videos":
            return {
              ...item,
              files: _overview.videos.files,
              size: _convertBits(_overview.videos.size),
              progress: (_overview.videos.size / BITS_IN_GB) * 100
            };
          case "Documents":
            return {
              ...item,
              files: _overview.docs.files,
              size: _convertBits(_overview.docs.size),
              progress: (_overview.docs.size / BITS_IN_GB) * 100
            };
          default:
            return item;
        }
      });
      setFiles(_files);
    }
  }, [props.overview]);

  return (
    <div className=''>
      <Heading>My Cloud</Heading>
      <p className='text-[#ccc] font-bold'>{`Hello ${auth.name.first}, welcome back!`}</p>
      <div className='flex flex-row my-8 gap-4'>
        {files.map(file => 
        (<CardDiv className={file.bg + ' '} key={file.type}>
          <div className='gap-1'>
            <div className='flex flex-row justify-between items-center mb-2'>
              <div className='bg-white px-2 py-2 rounded-full'>
                {file.icon}
              </div>
              <IoIosMore size={15}/>
            </div>
            <p className='font-medium text-[#555]'>{file.type}</p>
            <h2 className='font-bold text-xl'>{file.files} Files</h2>
            <Progress percent={file.progress} size={'small'} status='exception' strokeColor={file.progressColor} showInfo={false}/>
            <div className='flex flex-row justify-between'>
              <p className='text-[#555] text-xs'>{file.size}</p>
              <p className='text-[#555] text-xs'>{file.max} GB</p>
            </div>
            <Divider />
            <div className='flex flex-row justify-between items-center cursor-pointer'>
              <h2 className='font-bold'>View</h2>
              <AiOutlineArrowRight size={15} />
            </div>
          </div>
        </CardDiv>)
        )
        }
      </div>
    </div>
  )
}

export default Overview