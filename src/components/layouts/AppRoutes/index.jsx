import {} from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../screens/Dashboard'
import MyFiles from '../../screens/MyFiles'

function AppRoute() {
  return (
    <Routes>
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/my-files" exact element={<MyFiles />} />
      <Route path='/' exact element={<Dashboard />} />
    </Routes>
  )
}

export default AppRoute