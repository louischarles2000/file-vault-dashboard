import {} from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../screens/Dashboard'

function AppRoute() {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
    </Routes>
  )
}

export default AppRoute