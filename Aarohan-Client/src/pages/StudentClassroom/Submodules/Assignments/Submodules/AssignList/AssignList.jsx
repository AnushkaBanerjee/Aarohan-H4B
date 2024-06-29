import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Textarea } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@nextui-org/react";
import { Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { Backend_url } from "../../../../../../../BackendUrl";
import { useEffect } from "react";
import { useState } from "react";
import FilePreview from "../../../../../../components/Global/FilePreview/FilePreview";


export default function AssignList({ courseAssignments }) {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [submission, setSubmission] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage("");
    setErrorMessage("");
    setIsError(false);
    setOpenSnack(false);
  };
  const [description, setDescription] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [feedback, setFeedback] = React.useState('');
  const [reliability, setReliability] = React.useState(0);
  const [understandibility, setUnderstandibility] = React.useState(0);
  const [usefulness, setUsefulness] = React.useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);
  const [key, setKey] = React.useState();
  const [upload, setUpload] = React.useState(null);
  const [fileName, setFileName] = React.useState("No file chosen");

  const submitAssignment = async (event) => {
    event.preventDefault();
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await axios.post(
        `${Backend_url}/api/v1/submissions/submit-assignment?assignmentId=${selectedAssignment._id}`,
        {
          description: description,
          document: file
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // alert(response.data.message);
      if (response.data && response.data.success) {

        setSuccessMessage("Assignment submitted successfully");
        setIsError(false);
        setOpenSnack(true);
      } else {
        // console.error("Error submitting assignment:", response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage("All fields are required");
      }
      else if (error.response?.status === 409) {
        setErrorMessage("You have already submitted this assignment");
      }
      else {
        setErrorMessage("Server error. Please try again later");
      }
      setIsError(true);
      setOpenSnack(true);
    }
    setFile(null)
    setDescription('')
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
      label: "View assignment",
    },
    {
      key: "submit",
      label: "Submit Assignment",
    },
    {
      key: "submission",
      label: "View Submission",
    },
    {
      key: "feedback",
      label: "Give feedback",
    }
  ];
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const giveFeedback = async (event) => {
    event.preventDefault();

    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.post(`${Backend_url}/api/v1/assignments/give-assignment-feedback?assignmentId=${selectedAssignment._id}`, {
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
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMessage("Feedback already submitted for this Assignment");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }

      setUnderstandibility(0);
      setUsefulness(0);
      setReliability(0);
      setFeedback('');
      setIsError(true);
      setOpenSnack(true);
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

  const handleViewSubmission = async (assignmentId) => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }
      const response = await axios.get(`${Backend_url}/api/v1/submissions/view-submission?assignmentId=${assignmentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // console.log(response.data.data);
      if (response.data && response.data.success) {
        const submission = response.data.data;
        setSubmission(submission);
      } else {
        console.error("Error fetching submission:", response.data.message);
        return null;
      }
    }
    catch (error) {
      console.error("Error fetching submission:", error);
      return null;
    }
  };

  useEffect(() => {
    if (selectedAssignment) {
      handleViewSubmission(selectedAssignment._id);
    }
  }, [selectedAssignment]);

  return (

    <Accordion variant="splitted">
      {courseAssignments?.map((material, index) => (
        <AccordionItem key={index} aria-label={`Accordion ${index + 1}`} title={material.description} className="font-roboto text-xl">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1, marginRight: '1rem' }}>
              <p className=" text-lg font-inter text-black " >Deadline : {new Date(material.deadline).toLocaleString()}</p>
              <p className=" text-lg font-inter text-gray-600 ">Full Marks : {material.fullmarks}</p>
              <p className=" text-lg font-inter  text-gray-600">Uploaded : {new Date(material.createdAt).toLocaleString()}</p>
              <Modal backdrop="blur" isOpen={isOpen} onClose={closeModal} scrollBehavior="inside" className='h-auto my-auto' size="lg">
                <ModalContent>
                  {() => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        {
                          key === "View" && (
                            <FilePreview file={selectedAssignment.document} type="Image" />
                          )
                        }
                        {
                          key === "submit" && (
                            <h1 className="text-2xl font-bold font-inter">Submit Assignment</h1>
                          )
                        }
                        {
                          key === "submission" && (
                            <h1 className="text-2xl font-bold font-inter">View Submission</h1>
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
                              <h1>View Assignment</h1>
                            </div>
                          )
                        }
                        {
                          key === "submit" && (
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
                              <div className='flex gap-2 w-full text-center mb-4'>

                                <Input
                                  size="sm"
                                  isReadOnly
                                  type="description"
                                  label={fileName}
                                  variant="bordered"
                                  className=""
                                  color='primary'

                                />

                                <Button
                                  variant="bordered"
                                  color='primary'
                                  size="lg"
                                  startContent={<CloudUploadIcon />}
                                  onClick={() => document.getElementById('avatarUpload').click()}
                                >
                                  Upload file

                                </Button>
                                <input
                                  type="file"
                                  accept=""
                                  id="avatarUpload"
                                  style={{ display: 'none' }}
                                  onChange={handleImageChange}
                                />
                              </div>
                              <div className='space-y-4'>

                                <Input
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  type="description"
                                  label="Description"
                                  variant="bordered"
                                  className=""
                                  color='primary'
                                />
                                <div className="flex justify-end">
                                  <Button color='primary' className=" text-white-default font-bold "
                                    onClick={(e) => submitAssignment(e)}
                                  >
                                    Submit Assignment
                                  </Button>
                                </div>

                              </div>
                            </div>
                          )
                        }
                        {
                          key === "submission" && (
                            <div>
                              <p className=" text-lg font-inter text-black " >Description : {submission.description}</p>
                              <p className=" text-lg font-inter text-black " >Marks : {submission.marks}</p>
                              <p className=" text-lg font-inter text-black " >Submitted : {new Date(submission.createdAt).toLocaleString()}</p>
                              <FilePreview file={submission.document} type="Image" />
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
                  onClick={() => setSelectedAssignment(material)}
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
