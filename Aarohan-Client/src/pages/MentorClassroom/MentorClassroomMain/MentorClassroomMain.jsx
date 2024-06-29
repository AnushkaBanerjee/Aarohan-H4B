
import React,{useState,useEffect} from 'react';
import ClassroomSidebar from '../../../components/Global/ClassroomSidebar/ClassroomSidebar';
import ProfileBar from '../../../components/Global/ProfileBar/ProfileBar';
// import { faHome, faTasks , faSearch, faEnvelope, faChartBar,faTimeline,faSpinner} from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLoaderData } from "react-router-dom"
// import axios from 'axios';
// import { Backend_url } from '../../../Backend_url';

const MentorClassroom = () => {
  const { classId } = useParams();
  const data = useLoaderData()
  const menuItems = [

    { id:1, name: "Home", route: "Mentor/Home"},
    { id:2, name: "Analytics", route: `Mentor-Classroom/${classId}/Analytics` }, 
    { id:3, name: "Resources", route: `Mentor-Classroom/${classId}/Resources`},
    { id:4, name: "Assignments", route: `Mentor-Classroom/${classId}/Assignments` },
    { id:5, name: "Live Classes", route: `Mentor-Classroom/${classId}/LiveClasses` },
    { id:6, name: "Members", route: `Mentor-Classroom/${classId}/Members` },
    { id:7, name: "Join Invitations", route: `Mentor-Classroom/${classId}/JoinInvitations` },
    
  ];
  const title = "Mentor Classroom";
  const userRole = "mentor";
  // const [user, setUser] = useState({});
  // const [user, setUser] = useState({});
  // Define icons for menu items
//   const icons = [faChartBar,faHome, faTasks, faSearch, faEnvelope, faTimeline,faSpinner];
//   const data = useLoaderData()
  // console.log(data.data)
//   const [avatar,setAvatar] = useState()
//   const [name,setName] = useState()

//   useEffect(() => {
//     setAvatar(data.data.avatar)
//     setName(data.data.fullName)
//   }, [data.data.avatar,data.data.fullName])


  return (
    <div className="flex flex-col bg-grey-default h-screen overflow-hidden">
      
      <div className="flex flex-1">
        <ClassroomSidebar title={title} menuItems={menuItems} userRole={userRole} />
        
        <div className="flex-1 overflow-y-auto">
        {/* <Navbar avatar={avatar} name={name} isStudent={true}/> */}
        <ProfileBar isStudent={false} image={data?.data.avatar} userData={data?.data} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MentorClassroom;

