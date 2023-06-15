import {} from 'react'
import Heading from '../../elements/common/Heading'
import { Empty } from 'antd'

function FilePreview() {
  return (
    <div>
      <Heading>File Preview</Heading>
      <Empty description='No file selected' className='mt-8'/>
    </div>
  )
}

export default FilePreview