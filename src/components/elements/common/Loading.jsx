/* eslint-disable react/prop-types */
import { Spin } from 'antd'
import {} from 'react'

function Loading(props) {
  return <Spin size='large' className='my-20' tip={props.tip}/>
}

export default Loading;