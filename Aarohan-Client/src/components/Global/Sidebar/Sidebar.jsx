import React, { useState } from 'react';
import CompanyLogo from '../../../assets/Logo/LogoLogo.png';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School';
import {Tooltip} from "@nextui-org/react";
const Sidebar = ({title,menuItems,userRole}) => {
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
          <img src={CompanyLogo} alt="Company Logo" className='w-30 h-8' />
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

            {item.name === 'My Progress' &&
              <Tooltip content="My Progress" placement="right" color='primary'>
              <PsychologyIcon className={`text-xl ${selected === item.name ? 'text-blue-default' : 'text-[#A3AED0]'} hover:text-blue-default`} />
              </Tooltip>
              }

            {item.name === 'My Roadmap' &&
              <Tooltip content="My Roadmap" placement="right" color='primary'>
              <TimelineIcon className={`text-xl ${selected === item.name ? 'text-blue-default' : 'text-[#A3AED0]'} hover:text-blue-default`} /> 
              </Tooltip>
              }

            {item.name === 'My Courses' &&
              <Tooltip content="My Courses" placement="right" color='primary'>
              <SchoolIcon className={`text-xl ${selected === item.name ? 'text-blue-default' : 'text-[#A3AED0]'} hover:text-blue-default`} /> 
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

export default Sidebar;
