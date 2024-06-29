import React from "react";
import Banner from "../../../../components/Global/Banner/Banner";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Backend_url } from "../../../../../BackendUrl";
import { useEffect } from "react";
import ClassBanner from "../../../../components/Global/Banner/ClassBanner";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
const liveClasses = [
  {
    topic: "Dbms 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "12th August 2021",
    time: "10:00 AM"
  },
  {
    topic: "Dbms 2",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "12th August 2021",
    time: "10:00 AM"
  },
  {
    topic: "Dbms 3",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    date: "12th August 2021",
    time: "10:00 AM"
  },
  {
    topic: "Dbms 4",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    date: "12th August 2021",
    time: "10:00 AM"
  },
  {
    topic: "Dbms 5",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    date: "12th August 2021",
    time: "10:00 AM"
  },
  {
    topic: "Dbms 6",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    date: "12th August 2021",
    time: "10:00 AM"
  },
  {
    topic: "Dbms 7",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    date: "12th August 2021",
    time: "10:00 AM"
  },
  {
    topic: "Dbms 8",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    date: "12th August 2021",
    time: "10:00 AM"
  },

];

function MentorLiveClasses() {
  const navigate = useNavigate();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { classId } = useParams();
  const [class_Info, setClass_Info] = React.useState(null);
  const [liveClasses, setLiveClasses] = React.useState(null);
  const [topic, setTopic] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");


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

      const response = await axios.get(`${Backend_url}/api/v1/classes/get-my-class-dashboard-mentor?id=${classId}`, {
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic || !startTime || !endTime) {
      alert('Please fill in all fields');
      return;
    }
    // console.log("topic", topic);
    // console.log("startTime", startTime);
    // console.log("endTime", endTime);
    
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.post(`${Backend_url}/api/v1/live-classes/create-live-class?classId=${classId}`, {
        classId,
        topic,
        startTime,
        endTime
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data && response.data.success) {
        console.log("Live Class created successfully");
        onOpenChange();
        window.location.reload();
      } else {
        console.error("Error creating live class : ", response.data.message);
      }
    } catch (error) {
      console.error("Error creating live class :", error);
    }
    // Reset form fields
    setEndTime('');
    setTopic('');
    setStartTime('');
  }
  




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
                <Button variant="solid" className="bg-green-500 text-white-default font-inter text-xl font-medium" onClick={()=>navigate(`/Mentor-Classroom/${classId}/LiveClasses/${liveClasses._id}`)}>
                  Join
                </Button>

              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Button
        className="fixed bottom-4 right-4  bg-blue-default hover:bg-blue-700 text-white-default font-bold py-2 px-4 rounded-md text-sm md:text-base lg:py-3 lg:px-6 lg:text-lg"
        onPress={onOpen}
      >
        Schedule Live Class
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Schedule Live Class</ModalHeader>
              <ModalBody>
              <form  
              onSubmit={handleSubmit}
              className="bg-white-default shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Topic
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              id="topic"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
              Starts On
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startTime"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
              Ends On
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endTime"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white-default font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Live Class
            </button>
          </div>
          
        </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


    </div>
  );
}

export default MentorLiveClasses;
