import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Backend_url } from '../../../BackendUrl.js';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Courses({ title, category, description, teacherName, imageUrl, link, isMentor, isJoined }) {

  const navigate = useNavigate();
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

  const joinClass = async (classId) => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return null;
    }

    try {
      const response = await axios.post(
        `${Backend_url}/api/v1/classes/join`,
        {
          id: classId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSuccessMessage("join request sent successfully");
      setIsError(false);
      setOpenSnack(true);

    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage("You are already a member of this class");
      } else if (error.response?.status === 409) {
        setErrorMessage("You have already requested to join this class");
      } else {
        setErrorMessage("Server error. Please try again later");
      }
      setIsError(true);
      setOpenSnack(true);
      console.error("Error joining class:", error);
    }
  }

  const DeleteClass = async (classId) => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.delete(`${Backend_url}/api/v1/classes/delete?id=${classId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

      if (response.data && response.data.success) {
        // Redirect to the dashboard
        // navigate('/Mentor/Home');
        window.location.reload();
      }
    }
    catch (error) {
      console.error("Error deleting class:", error);
    }
  }

  const leaveClass = async (classId) => {
    // Implement the logic to leave the class
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.delete(`${Backend_url}/api/v1/classes/leave?id=${classId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

      if (response.data && response.data.success) {
        // Redirect to the dashboard
        // navigate('/Student/Courses');
        window.location.reload();
      }
    }
    catch (error) {
      console.error("Error leaving class:", error);
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


  return (
    <Card className="max-w-[300px] bg-white-default shadow-xl shadow-grey-medium">
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
      <CardHeader className="flex gap-3">
        <Image
          isZoomed
          alt="classroom image"
          className="object-cover"
          height={400}
          src={imageUrl}
          width={400}
        />
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-lg font-roboto text-blue-dark font-medium">Title: {title}</p>
        <p className="text-lg font-roboto text-blue-dark font-medium">Category: {category}</p>
        <p className="text-lg font-roboto text-blue-dark font-medium">Description: {description}</p>
        <p className="text-lg font-roboto text-blue-dark font-medium">Teacher Name: {teacherName}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex ">
          <div>
            {!isMentor && isJoined && <Link href={`/Student-Classroom/${link}/Analytics`} showAnchorIcon className="text-xl mx-auto">Go To Class</Link>}
          </div>
          <div>
            {!isMentor && isJoined && <Button onClick={() => leaveClass(link)} color="danger" variant="flat" className="text-xl mx-auto w-full"><ExitToAppIcon /></Button>}
          </div>
        </div>
        {!isMentor && !isJoined && <Button onClick={()=>joinClass(link)} color="primary" variant="flat" className="text-xl mx-auto w-full">Join Class</Button>}

        <div className="flex justify-between">
          <div>
            {isMentor && <Link href={`/Mentor-Classroom/${link}/Analytics`} showAnchorIcon className="text-xl mx-auto">Go To Class</Link>}
          </div>
          <div>
            {isMentor && <Button onClick={() => DeleteClass(link)} color="danger" variant="flat" className="text-xl mx-auto w-full"><DeleteIcon /></Button>}
          </div>
        </div>

      </CardFooter>
    </Card>
  );
}
