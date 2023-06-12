import { } from 'react'
import './App.css'
import AuthContextProvider from './contexts/Auth'
import FilesContextProvider from './contexts/Files'
import { ConfigProvider, Layout, Space } from 'antd'
import Sidebar from './components/layouts/Sidebar'
import Maintenance from './Maintenance'
import Navbar from './components/layouts/Navbar'

const { Sider, Content, Footer } = Layout;
function App() {

  return (
    <AuthContextProvider>
      <FilesContextProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#80df9a',
            },
          }}
          >
          <div className='flex h-[100vh]'>
            <Layout className=' md:flex h-full'>
              {/* <Sider width={'25vw'} className='md:flex hidden w-full'> */}
                <Sidebar />
                {/* <Footer className='w-full bg-[#000300] text-[#ccc] text-center'>
                    FileVault. ©2023
                </Footer> */}
              {/* </Sider> */}
            </Layout>
            <Layout className='w-full bg-[#eee] h-[95vh] my-4 mr-4 md:ml-0 ml-[5rem] rounded-xl'>
              <Content>
                {/* <h1>WELCOME</h1> */}
                <Navbar />
                {/* <Maintenance /> */}
              </Content>
            </Layout>
          </div>
        </ConfigProvider>
      </FilesContextProvider>
    </AuthContextProvider>
  )
}

export default App
