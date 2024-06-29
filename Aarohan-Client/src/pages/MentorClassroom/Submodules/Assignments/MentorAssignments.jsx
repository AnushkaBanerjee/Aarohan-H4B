import React from "react";
import Banner from "../../../../components/Global/Banner/Banner";
import MentorAssignmentList from "./MentorAssignmentList/MentorAssignmentList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Backend_url } from "../../../../../BackendUrl";
import { useEffect,useState } from "react";
import ClassBanner from "../../../../components/Global/Banner/ClassBanner";
import { Button } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";



function MentorAssignments() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { classId } = useParams();
  const [class_Info, setClass_Info] = React.useState(null);
  const [assignments, setAssignments] = React.useState(null);
  const [description, setDescription] = useState('');
  const [fullMarks, setFullMarks] = useState('');
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState(null);



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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

  const getAssignmentsInfo = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.get(`${Backend_url}/api/v1/assignments/get-all-assignments?classId=${classId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data && response.data.success) {
        const materials = response.data.data;
        return materials;
      } else {
        console.error("Error fetching mentors:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
      return null;
    }
  };

  useEffect(() => {
    getClassInfo().then((info) => {
      if (info) {
        setClass_Info(info);
      }

    });

    getAssignmentsInfo().then((materials) => {
      if (materials) {
        setAssignments(materials);
      }
    });

  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(description, fullMarks, deadline, file);
    const formData = new FormData();
    formData.append('description', description);
    formData.append('fullmarks', fullMarks);
    formData.append('deadline', deadline);
    formData.append('file', file);
    formData.append('classId', classId);
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.post(`${Backend_url}/api/v1/assignments/create-assignment?classId=${classId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data && response.data.success) {
        console.log("Assignment created successfully");
        onOpenChange();
        getAssignmentsInfo().then((materials) => {
          if (materials) {
            setAssignments(materials);
          }
        });
      } else {
        console.error("Error creating assignment:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
    }

    // Reset the form
    setDescription('');
    setFullMarks('');
    setDeadline('');
    setFile(null);
  };



  return (
    <div style={{height: "calc(100vh - 4.3rem)", width: "100%", display: "flex", flexDirection: "column", padding: "1rem", overflowY: "scroll", overflowX: "hidden"}}>
      <ClassBanner classData={class_Info?.classInfo} />
      <div className="flex flex-wrap gap-2 px-2 py-8 lg:gap-11 lg:p-4">
        <MentorAssignmentList courseAssignments={assignments} />
      </div>
      <Button
        className="fixed bottom-4 right-4  bg-blue-default hover:bg-blue-700 text-white-default font-bold py-2 px-4 rounded-md text-sm md:text-base lg:py-3 lg:px-6 lg:text-lg"
        onPress={onOpen}
      >
        Create Assignment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Upload New Assignment</ModalHeader>
              <ModalBody>
              <form onSubmit={handleSubmit} className="bg-white-default shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullMarks">
              Full Marks
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullMarks"
              type="text"
              placeholder="Full Marks"
              value={fullMarks}
              onChange={(e) => setFullMarks(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
              Deadline
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Upload File
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow"
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white-default font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Assignment
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

export default MentorAssignments;
