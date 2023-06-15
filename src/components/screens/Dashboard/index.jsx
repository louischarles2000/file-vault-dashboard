import {} from 'react'
// import { ImFilesEmpty } from 'react-icons/im'
import Overview from './Overview'
import Folders from './Folders'
import Recents from './Recents'
// import StorageGraph from './StorageGraph'
import FilePreview from './FilePreview'

function Dashboard() {
  return (
    <div className='h-full flex col-span-2'>
      <div className='flex-1 h-full overflow-hidden overflow-y-auto pb-[10rem]'>
        <Overview />
        <Folders />
        <Recents />
      </div>
      <div className='w-[30%] h-full overflow-y-auto overflow-x-hidden'>
        {/* <StorageGraph /> */}
        <FilePreview />
        {/* <Overview /> */}
      </div>
    </div>
  )
}

export default Dashboard