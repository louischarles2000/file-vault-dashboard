/* eslint-disable react/prop-types */
import {} from 'react'
import Heading from '../../elements/common/Heading'
import { Table, Tag } from 'antd'
import { AiOutlineArrowUp } from 'react-icons/ai'
import LinkButton from '../../elements/common/LinkButton'

const Title = (props) => <p className='flex flex-row items-center gap-3'>{props.title} <AiOutlineArrowUp /></p>

const columns = [
  {
    title: <Title title='Name'/>,
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title:  <Title title='Size'/>,
    dataIndex: 'size',
    key: 'size',
  },
  {
    title:  'Folder',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: <Title title='Last Modified'/>,
    key: 'date',
    dataIndex: 'date',
    // render: (_, record) => (
    //   <Space size="middle">
    //     <a>Invite {record.name}</a>
    //   </Space>
    // ),
  },
];
const data = [
  {
    key: '1',
    name: 'Final Project',
    size: '32 MB',
    tags: ['Projects'],
    date: '17, Jun, 2023'
  },
  {
    key: '2',
    name: 'Employees',
    size: '42 MB',
    tags: ['Reviews'],
    date: '16, Jun, 2023'
  },
  {
    key: '3',
    name: 'Finacial Statements',
    size: '32 MB',
    tags: ['Accounts'],
    date: '15 Jun, 2023'
  },
];

function Recents() {
  return (
    <div className='my-10'>
      <div className='flex flex-row justify-between mr-6'>
        <Heading>Recent files</Heading>
        <LinkButton title='See More'/>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={false}
        rowClassName='bg-[#eee] cursor-pointer'
        rootClassName='bg-[#eee] '
        className='bg-[#eee] mt-4'
        />
    </div>
  )
}

export default Recents