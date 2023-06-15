import {} from 'react'
import Heading from '../../elements/common/Heading'
import CardDiv from '../../elements/common/CardDiv'
import { CiImageOn, CiFolderOn } from 'react-icons/ci'
import { IoIosMore } from 'react-icons/io'
import { AiOutlineArrowRight, AiOutlinePlayCircle } from 'react-icons/ai'
// import { ImFilesEmpty } from 'react-icons/im'
import { Divider, Progress } from 'antd'

const files = [
  {
    type: 'Documents',
    files: 123,
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
    files: 50,
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
];
function Overview() {
  return (
    <div className=''>
      <Heading>My Cloud</Heading>
      <p className='text-[#ccc] font-bold'>Hello Louis, welcome back!</p>
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