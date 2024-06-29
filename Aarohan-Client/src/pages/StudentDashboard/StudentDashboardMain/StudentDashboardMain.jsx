
import React,{useState,useEffect} from 'react';
import Sidebar from '../../../components/Global/Sidebar/Sidebar';
import ProfileBar from '../../../components/Global/ProfileBar/ProfileBar';
// import { faHome, faTasks , faSearch, faEnvelope, faChartBar,faTimeline,faSpinner} from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom'
import { Backend_url } from '../../../../BackendUrl';


const StudentDashboard = () => {
  const menuItems = [

    { id:1, name: "Home", route: "Student/Home",icon:"Student/Home" },
    { id:2, name: "My Progress", route: "Student/Progress",icon:"chart-bar" }, 
    { id:3, name: "My Roadmap", route: "Student/Roadmap",icon:"tasks" },
    { id:4, name: "My Courses", route: "Student/Courses",icon:"search" },
  ];
  const title = "Student Dashboard";
  const userRole = "student";

  const data = useLoaderData()
  const [avatar,setAvatar] = useState()
  const [role,setRole] = useState()
  const [reload,setReload] = useState()

  useEffect(() => {
    setAvatar(data.data.avatar)
    setRole(data.data.role)
  }, [data.data.avatar,data.data.fullName,reload])


  return (
    <div className="flex flex-col bg-grey-default h-screen overflow-hidden">
      
      <div className="flex flex-1">
        <Sidebar title={title} menuItems={menuItems} userRole={role} />
        
        <div className="flex-1 overflow-y-auto">
        {/* <Navbar avatar={avatar} name={name} isStudent={true}/> */}
        <ProfileBar isStudent={true} image={avatar} userData={data?.data} setReload={setReload}/>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

export const studentInfoLoader = async () => {
  try {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      console.error("Access token not found");
      return null;
    }

    const response = await axios.get(`${Backend_url}/api/v1/users/get-current-student`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

