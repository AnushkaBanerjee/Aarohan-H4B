import React from 'react';
import Banner from '../../../../components/Global/Banner/Banner';
import { ScrollShadow } from "@nextui-org/react";
import Courses from '../../../../components/Global/Courses/Courses';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Backend_url } from '../../../../../BackendUrl';
import { useLoaderData } from 'react-router-dom'  

function StudentCourses
() {
  const [courseData, setCourseData] = useState([]);
  const [userData, setUserData] = useState(null);
    const data1 = useLoaderData()
  
    useEffect(() => {
      setCourseData(data1[0]);
        setUserData(data1[1]);
    }, []);
  return (
    <div style={{height: "calc(100vh - 4.3rem)",
      width: "100%",
      display: "flex",
      flexDirection:"column",
      padding: "1rem",
      overflowY: "scroll",
      overflowX: "hidden",
      background:"#EDE9E9"}}>
      <Banner mentor="Student" classroom="Your Joined Courses" userData={userData} />
      <div className="flex flex-wrap gap-2 px-2 py-8 lg:gap-11 lg:p-4">
        {courseData.map((course, index) => (
          <Courses 
            key={index}
            title={course.title}
            category={course.category}
            description={course.description}
            teacherName={course.teacherName}
            imageUrl={course.imageUrl}
            link={course.link}
            isMentor={false}
            isJoined={true}
          />
        ))}
      </div>
    </div>
  )
}

export default StudentCourses
;

export const studentMyCoursesInfoLoader = async () => {
  try {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      console.error("Access token not found");
      return null;
    }

    const response = await axios.get(`${Backend_url}/api/v1/classes/get-my-classes-for-student?input=`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const classes = response.data.data.map(classData => ({
      link: classData.class,
      classname: classData.classInfo[0].classname,
      title: classData.classInfo[0].title,
      category: classData.classInfo[0].category,
      ownerId: classData.ownerInfo[0]._id,
      teacherName: classData.ownerInfo[0].fullName,
      // ownerEmail: classData.ownerInfo[0].email,
      description: classData.classInfo[0].description,
      imageUrl: classData.classInfo[0].thumbnail

    }));

    const response2 = await axios.get(`${Backend_url}/api/v1/users/get-current-student`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const user = response2.data;


    return [classes, user];

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
