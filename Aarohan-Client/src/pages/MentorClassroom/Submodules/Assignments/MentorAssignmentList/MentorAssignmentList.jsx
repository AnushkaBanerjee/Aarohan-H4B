import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios, { all } from "axios";
import { Backend_url } from "../../../../../../BackendUrl";
import { useEffect, useState } from "react";
import ClassBanner from "../../../../../components/Global/Banner/ClassBanner";
import FilePreview from "../../../../../components/Global/FilePreview/FilePreview";

export default function MentorAssignmentList({ courseAssignments }) {
  const { classId } = useParams();
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);
  const [allSubmissions, setAllSubmissions] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [key, setKey] = React.useState();
  const [marks, setMarks] = React.useState(0);


  const markAssignment = async (e, markingSubmissionId) => {
    e.preventDefault();
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const response = await axios.put(`${Backend_url}/api/v1/submissions/mark-submission?submissionId=${markingSubmissionId}`, { marks }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.data && response.data.success) {
        // Close the dialog and refresh submissions
        window.location.reload();
      } else {
        console.error("Error marking submission:", response.data.message);
      }
    } catch (error) {
      console.error("Error marking submission:", error);
    }
  };


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
      label: "View Assignment",
    },
    {
      key: "View Submissions",
      label: "View Submissions",
    },
    {
      key: "delete",
      label: "Delete assignment",
    }
  ];

  const deleteAssignment = async (e) => {
    e.preventDefault();
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }
      const response = await axios.delete(`${Backend_url}/api/v1/assignments/delete-assignment?classId=${classId}&assignmentId=${selectedAssignment._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.data && response.data.success) {
        window.location.reload();
      }
    }
    catch (error) {
      console.error("Error deleting assignment:", error);
    }
  }

  const getSubmissionsInfo = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.get(`${Backend_url}/api/v1/submissions/view-all-submissions?assignmentId=${selectedAssignment._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      //   console.log(response.data.data);

      if (response.data && response.data.success) {
        const submissions = response.data.data.map(submission => ({
          id: submission._id,
          assignment: submission.assignment,
          description: submission.description,
          name: submission.owner.fullName,
          username: submission.owner.username,
          marks: submission.marks,
          createdAt: submission.createdAt,
          document: submission.document
        }));
        return submissions;
      } else {
        console.error("Error fetching submissions:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
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

  useEffect(() => {
    getSubmissionsInfo().then((submissions) => {
      setAllSubmissions(submissions);
    }
    );
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
                            <h1 className="text-2xl font-bold font-inter">View Assignment</h1>
                          )
                        }
                        {
                          key === "View Submissions" && (
                            <h1 className="text-2xl font-bold font-inter">View Submissions</h1>
                          )
                        }
                        {
                          key === "delete" && (
                            <h1 className="text-2xl font-bold font-inter">Delete Assignment</h1>
                          )
                        }

                      </ModalHeader>
                      <ModalBody>

                        {
                          key === "View" && (
                            <div>
                              <FilePreview file={selectedAssignment.document} type="Image" />
                            </div>
                          )
                        }
                        {
                          key === "View Submissions" && (
                            <div>
                              <Accordion variant="splitted">
                                {allSubmissions?.map((submission, index) => (
                                  <AccordionItem key={index} aria-label={`Accordion ${index + 1}`} title={submission.name} className="font-roboto text-xl">
                                    <p className=" text-lg font-inter text-black " >Description : {submission.description}</p>
                                    <p className=" text-lg font-inter text-black " >Marks : {submission.marks}</p>
                                    <p className=" text-lg font-inter text-black " >Submitted : {new Date(submission.createdAt).toLocaleString()}</p>
                                    <div className="my-4">
                                    <FilePreview file={submission.document} type="Image" />
                                    </div>
                                    {submission.marks === "unmarked" && (<>
                                      <label htmlFor="marks" className="block text-gray-700 text-md font-bold mb-2">Marks:</label>
                                      <div className="flex">
                                      <input type="text" id="marks"
                                        value={marks}
                                        onChange={(e) => setMarks(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                      <Button color="success" variant="solid" onClick={(e) => markAssignment(e, submission.id)}>Mark</Button>
                                      </div>
                                    </>)}
                                    
                                  </AccordionItem>))}
                                  {allSubmissions?.length === 0 && (
                                    <AccordionItem title="No submissions found">
                                    <h1 className="text-center text-lg font-inter">No submissions found</h1>
                                  </AccordionItem>
                                    )}
                              </Accordion>
                            </div>
                          )
                        }
                        {
                          key === "delete" && (
                            <div className="items-center text-center">
                              <h1 className="my-8">Are you sure you want to delete this assignment?</h1>
                              <Button color="danger" variant="solid" onClick={(e) => deleteAssignment(e)}>
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
                  onClick={() => setSelectedAssignment(material)}
                >
                  Open Menu
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={items}
              >
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
