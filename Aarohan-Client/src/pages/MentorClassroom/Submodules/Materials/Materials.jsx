import React from "react";
import Banner from "../../../../components/Global/Banner/Banner"
import MaterialList from "./Submodules/MaterialList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Backend_url } from "../../../../../BackendUrl";
import { useEffect,useState } from "react";
import ClassBanner from "../../../../components/Global/Banner/ClassBanner";
import { Button } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

const courseMaterials = [
  {
    title: "Course Material 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    fileType: "PDF",
    uploadDate: "12th August 2021"
  },
  {
    title: "Course Material 2",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    fileType: "PDF",
    uploadDate: "12th August 2021"
  },
  {
    title: "Course Material 3",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    fileType: "PDF",
    uploadDate: "12th August 2021"
  }
];

function Materials() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { classId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Image');
  const [file, setFile] = useState(null);
  const [class_Info, setClass_Info] = React.useState(null);
  const [materials, setMaterials] = React.useState(null);


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

  const getMaterialsInfo = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.get(`${Backend_url}/api/v1/materials/get-all-materials?classId=${classId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // console.log(response.data);
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

    getMaterialsInfo().then((materials) => {
      if (materials) {
        setMaterials(materials);
      }
    });

  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !type || !file) {
      alert('Please fill in all fields');
      return;
    }

    // Log formData to console for debugging
    // console.log('Form Data:', name, description, type, file);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('file', file);

    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.post(`${Backend_url}/api/v1/materials/upload-material?classId=${classId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data && response.data.success) {
        console.log("Material uploaded successfully");
        onOpenChange();
        getMaterialsInfo().then((materials) => {
          if (materials) {
            setMaterials(materials);
          }
        });
      } else {
        console.error("Error uploading material:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading material:", error);
    }

    // Reset form fields
    setName('');
    setDescription('');
    setType('Image');
    setFile(null);
  };

  return (
    <div style={{height: "calc(100vh - 4.3rem)", width: "100%", display: "flex", flexDirection: "column", padding: "1rem", overflowY: "scroll", overflowX: "hidden"}}>
      <ClassBanner classData={class_Info?.classInfo} />
      <div className="flex flex-wrap gap-2 px-2 py-8 lg:gap-11 lg:p-4">
        <MaterialList courseMaterials={materials} />
      </div>
      <Button
        className="fixed bottom-4 right-4  bg-blue-default hover:bg-blue-700 text-white-default font-bold py-2 px-4 rounded-md text-sm md:text-base lg:py-3 lg:px-6 lg:text-lg"
        onPress={onOpen}
      >
        Add Material
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Upload New Material</ModalHeader>
              <ModalBody>
              <form  
              onSubmit={handleSubmit} 
              className="bg-white-default shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Image">Image</option>
              <option value="Video">Video</option>
              <option value="Pdf">PDF</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Upload File
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow"
              id="file"
              type="file"
              accept="image/*, video/*, application/pdf"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white-default font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Upload
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Materials;
