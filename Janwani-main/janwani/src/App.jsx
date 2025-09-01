import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import MyTickets from './pages/MyTickets'
import SubmittedTicket from './pages/SubmittedTicket'
import Signup from './pages/Signup'
import Login from './pages/Login'
import EditProfile from './pages/EditProfile'
import IssueResolved from './pages/IssueResolved'

function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

function AppRoutes() {
  return (
    <div className='bg-amber-50 min-h-screen overflow-x-hidden'>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/editprofile' element={<EditProfile />} />
      <Route path='/myTickets' element={<MyTickets />} />
      <Route path='/myTickets/submittedtickets' element={<SubmittedTicket />} />
      <Route path='/myTickets/completed/ticket' element={<IssueResolved />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      
    </Routes>
  </div>
  )
  
}

export default App
