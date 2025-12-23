import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from '../Pages/HomeScreen'
import LoginForm from '../components/LoginForm'
import ProfileSetup from '../Pages/ProfileSetup'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/profile-setup' element={<ProfileSetup/>}/>
    </Routes>
  )
}

export default MainRoutes