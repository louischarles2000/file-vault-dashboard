
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
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/Auth';

function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}


const Sidebar = () => {
  const { logout, auth } = useContext(AuthContext)
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navigateTo = (route, params) => navigate(`/${route}`, { state: params })

  const items = [
    getItem('Dashboard', '1', <PieChartOutlined />, null, () => navigateTo('dashboard')),
    getItem('My Files', '2', <FolderOutlined />, null, () => navigateTo('my-files')),
    getItem('Recent', '3', <ClockCircleOutlined />, null, () => navigateTo('recent')),
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
    getItem(`Account (${auth.name.first} ${auth.name.last})`, 'sub3', <UserOutlined />, [
      getItem('Acount Info', '13', <InfoCircleOutlined/>, null, () => navigateTo('account')),
      getItem('Logout', '14', <LogoutOutlined />, null, logout),
    ]),
  ]

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
          items={[
            ...items,
            {
      
            }
          ]}
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