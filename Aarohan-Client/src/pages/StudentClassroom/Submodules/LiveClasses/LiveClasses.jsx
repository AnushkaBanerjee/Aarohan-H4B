import React from "react";
import Banner from "../../../../components/Global/Banner/Banner";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Backend_url } from "../../../../../BackendUrl";
import { useEffect } from "react";
import ClassBanner from "../../../../components/Global/Banner/ClassBanner";
import {useNavigate } from 'react-router-dom';




function LiveClasses() {
  const navigate = useNavigate();
  const { classId } = useParams();
  const [class_Info, setClass_Info] = React.useState(null);
  const [liveClasses, setLiveClasses] = React.useState(null);

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

  const getClassInfo = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.get(`${Backend_url}/api/v1/classes/get-my-class-dashboard-student?id=${classId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.data && response.data.success) {
        const classData = response.data.data;
        const ownerInfo = {
          _id: classData.owner._id,
          username: classData.owner.username,
          email: classData.owner.email,
          fullName: classData.owner.fullName,
          contactNo: classData.owner.contactNo,
          DOB: classData.owner.DOB,
          address: classData.owner.address,
          language: classData.owner.language,
          institution: classData.owner.institution,
          standard: classData.owner.standard,
          avatar: classData.owner.avatar,
          role: classData.owner.role,
          createdAt: classData.owner.createdAt,
          updatedAt: classData.owner.updatedAt
        };

        const classInfo = {
          _id: classData.class._id,
          classname: classData.class.classname,
          thumbnail: classData.class.thumbnail,
          title: classData.class.title,
          description: classData.class.description,
          category: classData.class.category,
          createdAt: classData.class.createdAt,
          updatedAt: classData.class.updatedAt
        };

        const membersInfo = classData.members.map(member => ({
          _id: member.memberInfo._id,
          username: member.memberInfo.username,
          email: member.memberInfo.email,
          fullName: member.memberInfo.fullName,
          contactNo: member.memberInfo.contactNo,
          DOB: member.memberInfo.DOB,
          address: member.memberInfo.address,
          language: member.memberInfo.language,
          institution: member.memberInfo.institution,
          standard: member.memberInfo.standard,
          avatar: member.memberInfo.avatar,
          role: member.memberInfo.role,
          createdAt: member.memberInfo.createdAt,
          updatedAt: member.memberInfo.updatedAt
        }));
        const info = { ownerInfo, classInfo, membersInfo };

        return info;

      } else {
        console.error("Error fetching mentors:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
      return null;
    }
  };

  const getLiveClassInfo = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.get(`${Backend_url}/api/v1/live-classes/get-all-live-classes?classId=${classId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data && response.data.success) {
        const liveClasses = response.data.data;
        return liveClasses;
      } else {
        console.error("Error fetching live Classes : ", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching live Classes :", error);
      return null;
    }
  };



  useEffect(() => {
    getClassInfo().then((info) => {
      if (info) {
        setClass_Info(info);
      }

    });

    getLiveClassInfo().then((materials) => {
      if (materials) {
        setLiveClasses(materials);
      }
    });

  }, []);


  return (
    <div style={{ height: "calc(100vh - 4.3rem)", width: "100%", display: "flex", flexDirection: "column", padding: "1rem", overflowY: "scroll", overflowX: "hidden" }}>
      <ClassBanner classData={class_Info?.classInfo} />
      <div className="flex flex-wrap gap-2 px-2 py-8 lg:gap-11 lg:p-4">
        <Accordion variant="splitted">
          {liveClasses?.map((material, index) => (
            <AccordionItem key={index} aria-label={`Accordion ${index + 1}`} title={`Meeting Topic : ${material.topic}`} className="font-roboto text-xl">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, marginRight: '1rem' }}>
                  <p className=" text-lg font-inter text-black " >Start Time : {new Date(material.startTime).toLocaleString()}</p>
                  <p className=" text-lg font-inter text-gray-600 ">End Time : {new Date(material.endTime).toLocaleString()}</p>
                </div>
                <Button variant="solid" className="bg-green-500 text-white-default font-inter text-xl font-medium" onClick={()=>navigate(`/Student-Classroom/${classId}/LiveClasses/${liveClasses._id}`)}>
                  Join
                </Button>

              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default LiveClasses;
