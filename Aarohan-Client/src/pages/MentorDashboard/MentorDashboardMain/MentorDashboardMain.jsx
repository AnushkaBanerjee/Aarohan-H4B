import React from 'react'
import ProfileBar from '../../../components/Global/ProfileBar/ProfileBar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom'
import { Backend_url } from '../../../../BackendUrl';
import { useEffect, useState } from 'react';



function MentorDashboardMain() {

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
        
        <div className="flex-1 overflow-y-auto">
        {/* <Navbar avatar={avatar} name={name} isStudent={true}/> */}
        <ProfileBar isStudent={false} image={avatar} userData={data?.data} />
          <Outlet />
        </div>
      </div>
  )
}

export default MentorDashboardMain


export const mentorInfoLoader = async () => {
  try {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      console.error("Access token not found");
      return null;
    }

    const response = await axios.get(`${Backend_url}/api/v1/users/get-current-mentor`, {
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