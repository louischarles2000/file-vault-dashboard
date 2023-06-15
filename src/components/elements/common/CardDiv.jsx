/* eslint-disable react/prop-types */
import {} from 'react'
import { Card } from 'antd'

function CardDiv(props) {
  return (
    <Card className={'w-[30%] px-0 pt-[-10px] ' + props.className}>
      {props.children}
    </Card>
  )
}

export default CardDiv