import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import LandingPageMain from './pages/Landing/LandingPageMain/LandingPageMain.jsx'
import { NextUIProvider } from "@nextui-org/react";
import SignupPage from './pages/Signup/SignupPage.jsx'
import MentorDashboardMain from './pages/MentorDashboard/MentorDashboardMain/MentorDashboardMain.jsx'
import CreateCourse from './pages/MentorDashboard/Submodules/CreateCourse/CreateCourse.jsx'
import {mentorInfoLoader} from'./pages/MentorDashboard/MentorDashboardMain/MentorDashboardMain.jsx'
import {mentorMyCoursesInfoLoader} from'./pages/MentorDashboard/Submodules/CreateCourse/CreateCourse.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* auth  */}
     
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />
      

      {/* landing */}
      <Route path="" element={<LandingPageMain />}/>

      {/* mentor dashboard */}
      <Route path="/Mentor/" loader={mentorInfoLoader} element={<MentorDashboardMain />}>
        <Route path="Home" loader={mentorMyCoursesInfoLoader} element={<CreateCourse />} />
      </Route>
        
    </Route>
  )
)




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>,
)
