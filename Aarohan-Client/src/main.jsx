import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login/Login'
import SignupPage from './pages/Signup/SignupPage'
import LandingPageMain from './pages/Landing/LandingPageMain/LandingPageMain'
import { NextUIProvider } from "@nextui-org/react";
import StudentDashboard from './pages/StudentDashboard/StudentDashboardMain/StudentDashboardMain'
import AllCourses from './pages/StudentDashboard/Submodules/Home/Home'
import StudentProgress from './pages/StudentDashboard/Submodules/StudentProgress/StudentProgress'
import StudentRoadmap from './pages/StudentDashboard/Submodules/StudentRoadmap/StudentRoadmap'
import StudentCourses from './pages/StudentDashboard/Submodules/StudentCourses/StudentCourses'
import MentorDashboardMain from './pages/MentorDashboard/MentorDashboardMain/MentorDashboardMain'
import CreateCourse from './pages/MentorDashboard/Submodules/CreateCourse/CreateCourse'
import MentorClassroom from './pages/MentorClassroom/MentorClassroomMain/MentorClassroomMain'
import MentorAnalytics from './pages/MentorClassroom/Submodules/Analytics/MentorAnalytics'
import Materials from './pages/MentorClassroom/Submodules/Materials/Materials'
import MentorAssignments from './pages/MentorClassroom/Submodules/Assignments/MentorAssignments'
import MentorLiveClasses from './pages/MentorClassroom/Submodules/LiveClasses/MentorLiveClasses'
import MentorClassMembers from './pages/MentorClassroom/Submodules/MentorClassMembers/MentorClassMembers'


import { studentInfoLoader } from './pages/StudentDashboard/StudentDashboardMain/StudentDashboardMain'
import { studentAllCoursesInfoLoader } from './pages/StudentDashboard/Submodules/Home/Home'
import { studentMyCoursesInfoLoader } from './pages/StudentDashboard/Submodules/StudentCourses/StudentCourses'
import { mentorInfoLoader } from './pages/MentorDashboard/MentorDashboardMain/MentorDashboardMain'
import { mentorMyCoursesInfoLoader } from './pages/MentorDashboard/Submodules/CreateCourse/CreateCourse'
import { MentorInfoLoader_1 } from './pages/MentorClassroom/Submodules/VideoMeet.jsx/VideoMeet'
import MentorLiveClassRoom from './pages/MentorClassroom/Submodules/VideoMeet.jsx/VideoMeet'




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

       {/* mentor dashboard */}
       <Route path="/Mentor/" loader={mentorInfoLoader} element={<MentorDashboardMain />}>
        <Route path="Home" loader={mentorMyCoursesInfoLoader} element={<CreateCourse />} />
      </Route>

      {/* mentor classroom */}
      <Route path="/Mentor-Classroom/:classId" loader={mentorInfoLoader} element={<MentorClassroom />}>
        <Route path="Analytics" element={<MentorAnalytics />} />
        <Route path="Resources" element={<Materials />} />
        <Route path="Assignments" element={<MentorAssignments />} />
        <Route path="LiveClasses" element={<MentorLiveClasses />} />
        <Route loader={MentorInfoLoader_1} path='LiveClasses/:liveClassId' element={<MentorLiveClassRoom />} />
        <Route path="Members" element={<MentorClassMembers />} />
        
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
