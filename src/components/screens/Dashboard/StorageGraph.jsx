import {} from 'react'
import Heading from '../../elements/common/Heading'
import { Progress, Tooltip } from 'antd'

function StorageGraph() {
  return (
    <div>
      <Heading>Storage Details</Heading>
      <div className='flex justify-center my-8'>
        <Tooltip title="3 done / 3 in progress / 4 to do">
          <Progress
            percent={60}
            success={{
              percent: 30,
            }}
            type="circle"
          />
        </Tooltip>
      </div>
    </div>
  )
}

export default StorageGraph