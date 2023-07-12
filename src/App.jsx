import { useContext } from 'react'
import './App.css'
import { Layout } from 'antd'
import Sidebar from './components/layouts/Sidebar'
import Navbar from './components/layouts/Navbar'
import AppRoute from './components/layouts/AppRoutes'
import { AuthContext } from './contexts/Auth'
// import Maintenance from './Maintenance'
import AuthScreen from './components/screens/Auth'

const { Content } = Layout;
function App() {
  const { auth } = useContext(AuthContext);

  const dashboard = (
    <div className='flex h-[100vh]'>
      <Layout className=' md:flex h-full'>
        <Sidebar />
      </Layout>
      <Layout className='w-full bg-[#eee] h-[95vh] overflow-hidden my-4 mr-4 md:ml-0 ml-[5rem] rounded-xl'>
        <Content className='h-full overflow-hidden'>
          <Navbar />
          <div className='h-full px-6 overflow-x-hidden overflow-y-auto'>
            <AppRoute />
          </div>
        </Content>
      </Layout>
    </div>
  );

  return (
    <>
    {/* <Maintenance /> */}
    {/* {dashboard} */}
    {(auth && auth.isEmailVerified) && (auth.mfaEnabled && auth.mfaCompleted) ? dashboard : <AuthScreen />}
    </>
  )
}

export default App
