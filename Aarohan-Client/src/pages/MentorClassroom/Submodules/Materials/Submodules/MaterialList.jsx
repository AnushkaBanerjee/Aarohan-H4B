import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { Chip, User } from "@nextui-org/react";
import { Backend_url } from "../../../../../../BackendUrl";
import { useEffect } from "react";
import { useState } from "react";
import FilePreview from "../../../../../components/Global/FilePreview/FilePreview";

export default function MaterialList({ courseMaterials }) {
  const { classId } = useParams();
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [key, setKey] = React.useState();
  const [selectedMaterial, setSelectedMaterial] = React.useState(null);
  const [fullSelectedMaterial, setFullSelectedMaterial] = React.useState(null);

  const getComments = async (materialId) => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.get(`${Backend_url}/api/v1/comments/get-all-comments?materialId=${materialId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // console.log(response.data.data);

      if (response.data && response.data.success) {
        const response2 = response.data.data.map(submission => ({
          id: submission._id,
          message: submission.message,
          senderName: submission.sender.fullName,
          senderAvatar: submission.sender.avatar,
          time: submission.createdAt
        }));
        setComments(response2);
      } else {
        console.error("Error fetching submissions:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (newComment.trim() === '') return;
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }
      const response = await axios.post(`${Backend_url}/api/v1/comments/create-comment?materialId=${selectedMaterial}`, {
        message: newComment
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.data && response.data.success) {
        getComments(selectedMaterial);
      } else {
        console.error("Error adding comment:");
      }
    }
    catch (error) {
      console.error("Error adding comment:", error);
    }
    setNewComment('');
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

  const deleteMaterial = async (e) => {
    e.preventDefault();
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }
      const response = await axios.delete(`${Backend_url}/api/v1/materials/delete-material?classId=${classId}&materialId=${selectedMaterial}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // console.log(response.data);
      if (response.data && response.data.success) {
        // alert('Material deleted successfully');
        window.location.reload();
      }
    }
    catch (error) {
      console.error("Error deleting material:", error);
    }
  }

  const openView = (key) => {
    onOpen();
    setKey(key);
  }
  const closeModal = () => {
    setKey(null);
    onClose();
  }
  const items = [
    {
      key: "View",
      label: "View material",
    },
    {
      key: "comment",
      label: "Comment on material",
    },
    {
      key: "delete",
      label: "Delete material",
    }
  ];



  return (
    <Accordion variant="splitted">
      {courseMaterials?.map((material, index) => (
        <AccordionItem key={index} aria-label={`Accordion ${index + 1}`} title={material.name} className="font-roboto text-xl">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1, marginRight: '1rem' }}>
              <p className=" text-lg font-inter text-black " >{material.description}</p>
              <p className=" text-lg font-inter text-gray-600 ">{material.type}</p>
              <p className=" text-lg font-inter  text-gray-600">{new Date(material.createdAt).toLocaleString()}</p>
              <Modal backdrop="blur" isOpen={isOpen} onClose={closeModal} scrollBehavior="inside" className='h-auto my-auto' size="lg">
                <ModalContent>
                  {() => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        {
                          key === "View" && (
                            <h1 className="text-2xl font-bold font-inter">View Material</h1>
                          )
                        }
                        {
                          key === "comment" && (
                            <h1 className="text-2xl font-bold font-inter">Comment on Material</h1>
                          )
                        }
                        {
                          key === "delete" && (
                            <h1 className="text-2xl font-bold font-inter">Delete Material</h1>
                          )
                        }

                      </ModalHeader>
                      <ModalBody>

                        {
                          key === "View" && (
                            <div className="w-full">
                              <FilePreview file={fullSelectedMaterial.file} type={fullSelectedMaterial.type} />
                            </div>
                          )
                        }
                        {
                          key === "comment" && (
                            <div className="flex-col justify-between">
                              <div className="w-full flex-col space-y-4 my-4">

                                {comments?.map((comment, index) => (
                                  <div>
                                    <User
                                      name={
                                        <div>
                                          <p className="text-lg font-bold">{comment.senderName}</p>
                                          <div>
                                            <Chip color="success" variant="flat">{new Date(comment.time).toLocaleString()}</Chip>
                                          </div>

                                        </div>
                                      }
                                      className="mb-2"
                                      description={
                                        <div>
                                          <p className="text-sm">{comment.message}</p>
                                        </div>
                                      }
                                      avatarProps={{
                                        src: comment.senderAvatar,

                                      }}
                                    />
                                  </div>
                                ))}


                              </div>
                              <div className="flex gap-2">
                                <Input
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  name="comment"
                                  label="Comment"
                                  color="primary"
                                  type="text"
                                  className="w-full"
                                  size="sm"
                                />
                                <Button color="primary" radius="sm" size="lg" endContent={<SendIcon />}
                                  onClick={(e) => handleSubmit(e)}>
                                  Send
                                </Button>
                              </div>
                            </div>
                          )
                        }
                        {
                          key === "delete" && (
                            <div className="items-center text-center">
                              <h1 className="my-8">Are you sure you want to delete this material?</h1>
                              <Button color="danger" variant="solid" onClick={(e) => deleteMaterial(e)}>
                                Delete
                              </Button>
                            </div>
                          )
                        }

                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={closeModal}>
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>

            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="solid"
                  className="text-lg font-inter  font-medium bg-primary text-white-default"
                  onClick={() => {
                    setSelectedMaterial(material._id);
                    getComments(material._id);
                    setFullSelectedMaterial(material);
                  }}
                >
                  Open Menu
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                  <DropdownItem
                    key={item.key}
                    color={item.key === "delete" ? "danger" : "default"}
                    className={item.key === "delete" ? "text-danger" : ""}
                    onClick={() => openView(item.key)}
                  >
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </AccordionItem>
      ))}
    </Accordion>

  );
}
