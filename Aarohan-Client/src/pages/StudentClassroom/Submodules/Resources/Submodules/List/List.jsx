import React, { useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Chip, Textarea } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, User } from "@nextui-org/react";
import SendIcon from '@mui/icons-material/Send';
import Rating from '@mui/material/Rating';
import { Typography } from "@mui/material";
import axios from "axios";
import { Backend_url } from "../../../../../../../BackendUrl";
import { Feed } from "@mui/icons-material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FilePreview from "../../../../../../components/Global/FilePreview/FilePreview";

export default function List({ courseMaterials }) {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage("");
    setErrorMessage("");
    setIsError(false);
    setOpenSnack(false);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [feedback, setFeedback] = React.useState('');
  const [reliability, setReliability] = React.useState(0);
  const [understandibility, setUnderstandibility] = React.useState(0);
  const [usefulness, setUsefulness] = React.useState(0);
  const [comments, setComments] = React.useState([]);
  const [key, setKey] = React.useState();
  const [selectedMaterial, setSelectedMaterial] = React.useState(null);
  const [fullSelectedMaterial, setFullSelectedMaterial] = React.useState(null);
  const [newComment, setNewComment] = React.useState('');
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
      key: "feedback",
      label: "Give feedback",
    }
  ];
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

  const giveFeedback = async (e) => {
    e.preventDefault();
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.post(`${Backend_url}/api/v1/materials/give-material-feedback?materialId=${selectedMaterial}`, {
        understandability: understandibility,
        usefulness: usefulness,
        reliability: reliability,
        text: feedback
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.success) {
        setSuccessMessage("Feedback submitted successfully");
        setIsError(false);
        setOpenSnack(true);
        setUnderstandibility(0);
        setUsefulness(0);
        setReliability(0);
        setFeedback('');
      } else {
        setErrorMessage("Failed to submit feedback");
        setIsError(true);
        setOpenSnack(true);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMessage("Feedback already submitted for this Material");
        setIsError(true);
        setOpenSnack(true);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
        setIsError(true);
        setOpenSnack(true);
      }
      setUnderstandibility(0);
      setUsefulness(0);
      setReliability(0);
      setFeedback('');
    }
  }

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
                            <FilePreview file={fullSelectedMaterial.file} type={fullSelectedMaterial.type}/>
                          )
                        }
                        {
                          key === "comment" && (
                            <h1 className="text-2xl font-bold font-inter">Comment on Material</h1>
                          )
                        }
                        {
                          key === "feedback" && (
                            <h1 className="text-2xl font-bold font-inter">Give Feedback</h1>
                          )
                        }

                      </ModalHeader>
                      <ModalBody>

                        {
                          key === "View" && (
                            <div>

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
                          key === "feedback" && (
                            <div>
                              <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                                <Alert
                                  onClose={handleClose}
                                  severity={isError ? "error" : "success"}
                                  variant="filled"
                                  sx={{ width: '100%' }}
                                >
                                  {isError ? errorMessage : successMessage}
                                </Alert>
                              </Snackbar>
                              <div className="flex gap-4">
                                <Typography variant="h6" className="text-lg font-bold">Reliability
                                </Typography>
                                <Rating
                                  size="large"
                                  name="simple-controlled"
                                  value={reliability}
                                  onChange={(e) => setReliability(e.target.value)}
                                />
                              </div>
                              <div className="flex gap-4">
                                <Typography variant="h6" className="text-lg font-bold">Understandibility</Typography>
                                <Rating
                                  size="large"
                                  name="simple-controlled"
                                  value={understandibility}
                                  onChange={(e) => setUnderstandibility(e.target.value)}
                                />
                              </div>
                              <div className="flex gap-4 mb-4">
                                <Typography variant="h6" className="text-lg font-bold">Usefulness</Typography>
                                <Rating
                                  size="large"
                                  name="simple-controlled"
                                  value={usefulness}
                                  onChange={(e) => setUsefulness(e.target.value)}
                                />

                              </div>
                              <Textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                label="Give Classroom Feedback"
                                variant="bordered"
                                labelPlacement="inside"
                                color="primary"

                              />
                              <div className='flex justify-end p-4 pr-0'>
                                <Button variant="solid" color="primary" endContent={<SendIcon />} onClick={(e) => giveFeedback(e)}>
                                  Send
                                </Button>
                              </div>
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
