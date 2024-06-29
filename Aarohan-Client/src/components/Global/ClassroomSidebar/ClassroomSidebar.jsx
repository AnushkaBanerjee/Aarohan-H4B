
import React, { useState } from 'react';
import CompanyLogo from '../../../assets/Logo/LogoLogo.png';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import PeopleIcon from '@mui/icons-material/People';
import {Tooltip} from "@nextui-org/react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ClassroomSidebar = ({title,menuItems,userRole}) => {
  const [selected, setSelected] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative">
      

      <div className={`static top-0 left-0 h-screen bg-white-default text-white transition-transform transform w-14 md:w-20 lg:w-64 z-50 flex flex-col`}>
        <div className="flex items-center justify-center h-20 border-b lg:flex">
          <img src={CompanyLogo} alt="Company Logo" className='h-12' />
        </div>
        <div className="flex flex-col mt-7 pr-1 space-y-1 flex-grow">
        

          {menuItems.map((item) => (
            <Link
              to={`/${item.route}`}
              key={item.name}
              onClick={() => handleSelect(item.name)}
              className={`flex items-center px-4 py-2 ${
                selected === item.name ? 'text-blue-default border-r-4 border-blue-default bg-gray-100 font-semibold ' : 'text-[#A3AED0]  '
              }  hover:scale-105 hover:duration-150 hover:bg-gray-100 hover:text-blue-default hover:border-r-4 hover:border-blue-default`}
            >

            {item.name === 'Home' &&
              <Tooltip content="Home" placement="right" color='primary'>
              <HomeIcon className={`text-xl ${selected === item.name ? 'text-blue-default' : 'text-[#A3AED0]'} hover:text-blue-default`} />
              </Tooltip>
            }

            {item.name === 'Analytics' &&
              <Tooltip content="Analytics" placement="right" color='primary'>
              <AnalyticsIcon className={`text-xl ${selected === item.name ? 'text-blue-default' : 'text-[#A3AED0]'} hover:text-blue-default`} />
              </Tooltip>
              }

            {item.name === 'Resources' &&
              <Tooltip content="Resources" placement="right" color='primary'>
              <MenuBookIcon className={`text-xl ${selected === item.name ? 'text-blue-default' : 'text-[#A3AED0]'} hover:text-blue-default`} /> 
              </Tooltip>
              }

            {item.name === 'Assignments' &&
              <Tooltip content="Assignments" placement="right" color='primary'>
              <AssignmentIcon className={`text-xl ${selected === item.name ? 'text-blue-default' : 'text-[#A3AED0]'} hover:text-blue-default`} /> 
              </Tooltip>
              }
            {item.name === 'Live Classes' &&
              <Tooltip content="Live Classes" placement="right" color='primary'>
              <CastForEducationIcon className={`text-xl ${selected === item.name ? 'text-blue-default' : 'text-[#A3AED0]'} hover:text-blue-default`} /> 
              </Tooltip>
              }
            {item.name === 'Members' &&
              <Tooltip content="Members" placement="right" color='primary'>
              <PeopleIcon className={`text-xl ${selected === item.name ? 'text-blue-default' : 'text-[#A3AED0]'} hover:text-blue-default`} /> 
              </Tooltip>
              }
            {item.name === 'Join Invitations' &&
              <Tooltip content="Join Invitations  " placement="right" color='primary'>
              <PersonAddIcon className={`text-xl ${selected === item.name ? 'text-blue-default' : 'text-[#A3AED0]'} hover:text-blue-default`} /> 
              </Tooltip>
              }

              <span className="ml-4 hidden lg:text-xl lg:inline">{item.name}</span>
            </Link>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default ClassroomSidebar;
