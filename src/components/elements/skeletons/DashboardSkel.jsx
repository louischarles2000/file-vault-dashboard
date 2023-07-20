import { Skeleton } from 'antd'
import {} from 'react'

function DashboardSkel() {
  return (
    <div className='px-5'>
    <div className='flex flex-col'>
      <div className='flex flex-col gap-2 mb-8'>
        <Skeleton.Button active size='large' style={{ height: 30, width: 100 }}/>
        <Skeleton.Button active size='large' style={{ height: 20, width: 200 }}/>
      </div>
      <div className='flex-row mb-10'>
        <Skeleton.Button active size='large' style={{ height: 200, width: 200, marginRight: 10 }}/>
        <Skeleton.Button active size='large' style={{ height: 200, width: 200, marginRight: 10 }}/>
        <Skeleton.Button active size='large' style={{ height: 200, width: 200, marginRight: 10 }}/>
        <Skeleton.Button active size='large' style={{ height: 200, width: 200, marginRight: 10 }}/>
      </div>
      <Skeleton.Button active size='large' style={{ height: 30, width: 100 }}/>
      <div className='flex-row mt-4'>
        <Skeleton.Button active size='large' style={{ height: 100, width: 150, marginRight: 10 }}/>
        <Skeleton.Button active size='large' style={{ height: 100, width: 150, marginRight: 10 }}/>
        <Skeleton.Button active size='large' style={{ height: 100, width: 150, marginRight: 10 }}/>
        <Skeleton.Button active size='large' style={{ height: 100, width: 150, marginRight: 10 }}/>
        <Skeleton.Button active size='large' style={{ height: 100, width: 150, marginRight: 10 }}/>
      </div>
    </div>
    </div>
  )
}

export default DashboardSkel