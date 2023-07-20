import { Skeleton, Space } from 'antd'
import {} from 'react'

function NavBarSkel() {
  return (
    <div className='p-10'>
      <Space>
        <Skeleton.Input active size='large' style={{ width: 600, borderRadius: 10 }}/>
        <Skeleton.Button active size='large' shape='round' style={{ width: 60, borderRadius: 10, marginLeft: 10 }}/>
        <Skeleton.Button active size='large' shape='circle' style={{ borderRadius: 10, marginLeft: 10 }}/>
        <Skeleton.Button active size='large' shape='circle' style={{ borderRadius: 10, marginLeft: 10 }}/>
        <Skeleton.Button active size='large' shape='circle' style={{ borderRadius: 10, marginLeft: 10 }}/>
      </Space>
    </div>
  )
}

export default NavBarSkel