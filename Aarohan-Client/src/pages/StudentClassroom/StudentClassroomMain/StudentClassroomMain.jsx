
import React,{useState,useEffect} from 'react';
import ClassroomSidebar from '../../../components/Global/ClassroomSidebar/ClassroomSidebar';
import ProfileBar from '../../../components/Global/ProfileBar/ProfileBar';
// import { faHome, faTasks , faSearch, faEnvelope, faChartBar,faTimeline,faSpinner} from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';
// import axios from 'axios';
// import { Backend_url } from '../../../Backend_url';
import { useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom'

const StudentClassroom = () => {
  const { classId } = useParams();
  const menuItems = [

    { id:1, name: "Home", route: "Student/Home"},
    { id:2, name: "Analytics", route: `Student-Classroom/${classId}/Analytics` }, 
    { id:3, name: "Resources", route: `Student-Classroom/${classId}/Resources`},
    { id:4, name: "Assignments", route: `Student-Classroom/${classId}/Assignments` },
    { id:5, name: "Live Classes", route: `Student-Classroom/${classId}/LiveClasses` },
    { id:6, name: "Members", route: `Student-Classroom/${classId}/Members` },
    
  ];
  const title = "Student Classroom";
  const userRole = "student";
  const data = useLoaderData()
  


  return (
    <div className="flex flex-col bg-grey-default h-screen overflow-hidden">
      
      <div className="flex flex-1">
        <ClassroomSidebar title={title} menuItems={menuItems} userRole={userRole} />
        
        <div className="flex-1 overflow-y-auto">
        {/* <Navbar avatar={avatar} name={name} isStudent={true}/> */}
        <ProfileBar isStudent={true} image={data?.data.avatar} userData={data?.data} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentClassroom;

