import React, { useEffect, useCallback, useState } from "react";
import ClassBanner from "../../../../components/Global/Banner/ClassBanner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Textarea
} from "@nextui-org/react";
import SendIcon from '@mui/icons-material/Send';
import { useParams, useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@nextui-org/react";
import axios from "axios";
import { Backend_url } from "../../../../../BackendUrl";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
  student: "success",
  mentor: "danger",
};

function Members() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classInfo, setClassInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const getClassInfo = async () => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.get(
        `${Backend_url}/api/v1/classes/get-my-class-dashboard-mentor?id=${classId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data && response.data.success) {
        const classData = response.data.data;
        const membersInfo = classData.members.map((member) => ({
          id: member.memberInfo._id,
          name: member.memberInfo.fullName,
          role: member.memberInfo.role,
          email: member.memberInfo.email,
          avatar: member.memberInfo.avatar,
        }));
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
        setClassInfo({ members: membersInfo, classInfo: classInfo });
      } else {
        console.error("Error fetching class info:", response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching class info:", error);
      setErrorMessage(error.message);
    }
  };

  const sendFeedBack = async (e) => {
    e.preventDefault();
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.post(`${Backend_url}/api/v1/classes/give-student-feedback?id=${classId}&studentId=${selectedStudent}`, {
        text: feedback
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.message === "Feedback Updated successfully") {
        setSuccessMessage("Feedback Updated successfully");
        setFeedback('');
        setIsError(false);
        setOpenSnack(true);
      } else if (response.data.message !== "Feedback Updated successfully" && response.data.success) {
        setSuccessMessage("Feedback submitted successfully");
        setFeedback('');
        setIsError(false);
        setOpenSnack(true);
      } else {
        setErrorMessage1("Failed to submit feedback");
        setIsError(true);
        setOpenSnack(true);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMessage1("Feedback already submitted for this student");

      } else {
        setErrorMessage1("An error occurred. Please try again later.");
      }
      setIsError(true);
      setOpenSnack(true);
    }
  }

  const removeStudent = async (studentId) => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.delete(
        `${Backend_url}/api/v1/classes/remove-student-from-class?id=${classId}&memberId=${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );

      if (response.data && response.data.success) {
        window.location.reload();
      } else {
        console.error("Error removing student:", response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error removing student:", error);
      setErrorMessage(error.message);
    }
  };
  const [selectedStudent, setSelectedStudent] = useState(null);
  const feedbackStudent = (studentId) => {
    setSelectedStudent(studentId);
    openView();
  };

  useEffect(() => {
    getClassInfo();
  }, []);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );

      case "role":
        return (
          <Chip
            className="capitalize text-base"
            color={statusColorMap[user.role]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          user.role === "student" && (
            <div className="relative flex justify-evenly gap-4">
              <Tooltip content="Give Feedback">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Button
                    className="bg-green-500 text-white-default rounded-md"
                    onClick={() => feedbackStudent(user.id)}
                  >
                    Give Feedback
                  </Button>
                </span>
              </Tooltip>
              <Tooltip content="Remove Student">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Button
                    className="bg-red-500 text-white-default rounded-md"
                    onClick={() => removeStudent(user.id)}
                  >
                    Remove
                  </Button>
                </span>
              </Tooltip>
            </div>
          )
        );

      default:
        return cellValue;
    }
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [errorMessage1, setErrorMessage1] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage("");
    setErrorMessage1("");
    setIsError(false);
    setOpenSnack(false);
  };
  const openView = () => {
    onOpen();

  }
  const closeModal = () => {

    onClose();
  }
  return (
    <div
      style={{
        height: "calc(100vh - 4.3rem)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <ClassBanner classData={classInfo?.classInfo} />
      <div className="w-full bg-transparent rounded-md">
        <h1 className="text-2xl font-medium text-center mb-4 text-black">
          Members
        </h1>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        <Table hideHeader aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={"center"}
                className="bg-primary text-white-default text-medium"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={classInfo ? classInfo.members : []}>
            {(item) => (
              <TableRow
                key={item.id}
                className="text-blue-dark font-inter"
              >
                {(columnKey) => (
                  <TableCell className="text-left">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={closeModal} scrollBehavior="inside" className='h-auto my-auto' size="lg">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold font-inter">Give Feedback</h1>
          </ModalHeader>
          <ModalBody>
            <div>
              <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert
                  onClose={handleClose}
                  severity={isError ? "error" : "success"}
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {isError ? errorMessage1 : successMessage}
                </Alert>
              </Snackbar>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                name='feedback'
                label="Give Student Feedback"
                variant="bordered"
                labelPlacement="inside"
                color="primary"
              />
              <div className='flex justify-end p-4 pr-0'>
                <Button color="primary" variant="solid" endContent={<SendIcon />} onClick={(e) => sendFeedBack(e)}>Send</Button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Members;
