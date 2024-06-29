import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login/Login'
import LandingPageMain from './pages/Landing/LandingPageMain/LandingPageMain'
import { NextUIProvider } from "@nextui-org/react";
import SignupPage from './pages/Signup/SignupPage'
import StudentDashboard from './pages/StudentDashboard/StudentDashboardMain/StudentDashboardMain'
import AllCourses from './pages/StudentDashboard/Submodules/Home/Home'
import StudentProgress from './pages/StudentDashboard/Submodules/StudentProgress/StudentProgress'
import StudentRoadmap from './pages/StudentDashboard/Submodules/StudentRoadmap/StudentRoadmap'
import StudentCourses from './pages/StudentDashboard/Submodules/StudentCourses/StudentCourses'
import { studentInfoLoader } from './pages/StudentDashboard/StudentDashboardMain/StudentDashboardMain'
import { studentAllCoursesInfoLoader } from './pages/StudentDashboard/Submodules/Home/Home'
import { studentMyCoursesInfoLoader } from './pages/StudentDashboard/Submodules/StudentCourses/StudentCourses'
import GiveTest from './pages/StudentDashboard/Submodules/StudentRoadmap/Submodules/GiveTest/GiveTestMain/GiveTestMain'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* auth  */}
     
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />
      

      {/* landing */}
      <Route path="" element={<LandingPageMain />}/>

      {/* student dashboard */}
      <Route loader={studentInfoLoader} path="/Student/" element={<StudentDashboard />}>
        <Route loader={studentAllCoursesInfoLoader} path="Home" element={<AllCourses />} />
        <Route path="Progress" element={<StudentProgress />} />
        <Route path="Roadmap" element={<StudentRoadmap />} />
        <Route loader={studentMyCoursesInfoLoader} path="Courses" element={<StudentCourses />} />
      </Route>
        
      <Route path="/Give-test/:id/" element={<GiveTest />} />
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
