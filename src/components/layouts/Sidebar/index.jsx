// import {} from 'react'

// function Sidebar() {
//   return (
//     <div className='p-3 bg-[#000300] w-full h-full'>
//       <h2 className='text-[#80df9a] text-xl font-bold my-2'>FileVault.</h2>
//     </div>
//   )
// }

import {
  AppstoreOutlined,
  PieChartOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CloseOutlined,
  MenuOutlined,
  FolderOutlined,
  GroupOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('My Files', '2', <FolderOutlined />),
  getItem('Recent', '3', <ClockCircleOutlined />),
  getItem('Teams', 'sub1', <GroupOutlined />, [
    getItem('Accounts', '5'),
    getItem('IT', '6'),
    getItem('General', '7'),
    getItem('Admin', '8'),
  ]),
  getItem('More Options', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
  
];

const accountItems = [
  getItem('Account (Louis Charles)', 'sub3', <UserOutlined />, [
    getItem('Acount Info', '13', <InfoCircleOutlined/>),
    getItem('Logout', '14', <LogoutOutlined />),
  ]),
]

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      className='bg-[#000300] h-full md:relative absolute'
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        className='m-4 md:hidden'
        // style={{
        //   marginBottom: 16,
        // }}
      >
        {collapsed ? <MenuOutlined /> : <CloseOutlined />}
      </Button>
      <h2 className='text-[#80df9a] text-xl font-bold my-2 p-4'>FileVault.</h2>
      <div className='h-[80vh] flex flex-col justify-between bg-[#000300]'>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          className='bg-[#000300] '
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          className='bg-[#000300]'
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={accountItems}
        />
      </div>
    </div>
  );
};

export default Sidebar