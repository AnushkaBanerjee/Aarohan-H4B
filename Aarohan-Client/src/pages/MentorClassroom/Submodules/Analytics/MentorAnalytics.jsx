import React, { useState } from 'react';
import Banner from '../../../../components/Global/Banner/Banner';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { BarChart } from '@mui/x-charts/BarChart';
import { Tabs, Tab, Card, CardBody, Tooltip, Chip, Textarea } from "@nextui-org/react";
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import TimelineIcon from '@mui/icons-material/Timeline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import useWindowDimensions from '../../../../components/Util/UseWindowDimensions';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import StatCard from '../../../../components/Global/StatCard/StatCard';
import axios from 'axios';
import { useEffect } from 'react';
import { Backend_url } from '../../../../../BackendUrl';
import { useParams } from 'react-router-dom';
import ClassBanner from '../../../../components/Global/Banner/ClassBanner';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function MentorAnalytics() {

  const { classId } = useParams();
  const { width } = useWindowDimensions();
  const [chart, setChart] = useState(1);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

  const [classNegativeFeedback, setClassNegativeFeedback] = useState(null);
  const [classPositiveFeedback, setClassPositiveFeedback] = useState(null);
  const [assignmentFeedbackEmotions, setAssignmentFeedbackEmotions] = useState([]);
  const [materialFeedbackEmotions, setMaterialFeedbackEmotions] = useState([]);
  const [assignmentScores, setAssignmentScores] = useState([]);
  const [materialScores, setMaterialScores] = useState([]);
  const [materialCount, setMaterialCount] = useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);



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



  const [class_Info, setClass_Info] = useState()


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

  const getStudentAnalytics = async () => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.get(`${Backend_url}/api/v1/classes/get-class-analytics?classId=${classId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const classFeedbacks = response.data.data.classFeedbacks;
      const classPositiveFeedbacks = classFeedbacks.filter(
        (feedback) => feedback.emotion === "POSITIVE"
      );
      setClassPositiveFeedback(classPositiveFeedbacks[0]?.count);
      const classNegativeFeedbacks = classFeedbacks.filter(
        (feedback) => feedback.emotion === "NEGATIVE"
      );
      setClassNegativeFeedback(classNegativeFeedbacks[0]?.count);
      setAssignmentFeedbackEmotions(response.data.data.assignmentFeedbacksEmotions);
      setMaterialFeedbackEmotions(response.data.data.materialFeedbacksEmotions);
      setAssignmentScores(response.data.data.assignmentStarsCount);
      setMaterialScores(response.data.data.materialStarsCount);
      setMaterialCount(response.data.data.totalMaterials);
      setAssignmentCount(response.data.data.totalAssignments);
      setMembersCount(response.data.data.totalStudents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClassInfo().then((info) => {
      if (info) {
        setClass_Info(info);
      }
    });
    getStudentAnalytics();
  }, []);

  return (
    <div style={{
      height: "calc(100vh - 4.3rem)",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      overflowY: "scroll",
      
      background: "#EDE9E9"
    }}>
      <ClassBanner classData={class_Info?.classInfo} />
      <div className="rounded-md bg-cover bg-no-repeat flex justify-center items-center p-4">
        <Tabs
          aria-label="Options"
          placement='top'
          color='primary'
          className='flex justify-center '
          onSelectionChange={(key) => setChart(Number(key))}
        >
          <Tab key="1" title={
            width < 1200 ? <Tooltip key="overview" color="primary" content="Classroom Overview" className="capitalize"><PlagiarismIcon /></Tooltip> :
              <div className="flex items-center space-x-2">
                <PlagiarismIcon />
                <span>Classroom Overview</span>
              </div>
          } />
          <Tab key="2" title={
            width < 1200 ? <Tooltip key="accuracy" color="primary" content="Material Report" className="capitalize"><NetworkCheckIcon /></Tooltip> :
              <div className="flex items-center space-x-2">
                <NetworkCheckIcon />
                <span>Material Report</span>
              </div>
          } />
          <Tab key="3" title={
            width < 1200 ? <Tooltip key="performance" color="primary" content="Assignment Report" className="capitalize"><TimelineIcon /></Tooltip> :
              <div className="flex items-center space-x-2">
                <TimelineIcon />
                <span>Assignment Report</span>
              </div>
          } />
          <Tab key="4" title={
            width < 1200 ? <Tooltip key="Classroom Feedbacks" color="primary" content="Classroom Feedbacks" className="capitalize"><DriveFolderUploadIcon /></Tooltip> :
              <div className="flex items-center space-x-2">
                <DriveFolderUploadIcon />
                <span>Classroom Feedbacks</span>
              </div>
          } />
        </Tabs>
      </div>
      <div className='bg-white-default p-4 rounded-md h-auto  items-center'>
        {chart === 1 && (
          <div className="container items-center px-4 py-8 m-auto">
            <div className="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">
              <StatCard value={materialCount} title="Total Material" />
              <StatCard value={assignmentCount} title="Total Assignments" />
              <StatCard value={membersCount} title="Students Count" />
            </div>
          </div>
        )}
        {chart === 2 && (
          <div className='text-center'>


            {materialScores.map((material) => (
              <div key={material.description} style={{ width: "50%", margin: "auto", textAlign: "center" }} className="pt-8">
                <h2 className="mb-8 text-xl font-mono">{material.description}</h2>
                {material.totalFeedbackCount > 0 && (
                  <BarChart

                    xAxis={[{ scaleType: 'band', data: ['Reliability', 'Understandability', 'Usefulness'] }]}
                    series={[{ data: [material.fullReliabilityStars, material.fullUnderstandabilityStars, material.fullUsefulnessStars], label: 'Scrore' }, { data: [material.totalReliabilityStars, material.totalUnderstandabilityStars, material.totalUsefulnessStars], label: 'Full Score' }]}
                    width={500}
                    height={300}
                  />
                )}
                {material.totalFeedbackCount === 0 && <p>No feedback found</p>}
              </div>
            ))}
            {materialFeedbackEmotions.map((material, index) => (
              <div key={index} >
                <h2 className="mb-8 text-xl font-mono">{material.description}</h2>
                {material.positiveFeedbackCount !== 0 || material.negativeFeedbackCount !== 0 ? (
                  <div className='w-full xl:w-2/3 mx-auto'>
                    <PieChart
                      series={[
                        {
                          data: [{ id: 0, value: material.positiveFeedbackCount, label: 'Positive Feedback' },
                          { id: 1, value: material.negativeFeedbackCount, label: 'Negative Feedback' },],
                          highlightScope: { faded: 'global', highlighted: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -20, color: 'gray' },
                        },
                      ]}
                      height={isSmallScreen ? 100 : isMediumScreen ? 200 : 250}
                    />
                  </div>
                ) : (
                  <p>No Feedback found</p>
                )}
              </div>
            )
            )
            }

          </div>
        )}
        {chart === 3 && (
          <div className='text-center flex-col w-full'>
            {assignmentScores.map((assignment) => (
              <div key={assignment.description} 
              style={{ width: "50%", margin: "auto", textAlign: "center" }} className="pt-8">
                <h2 className="mb-8 text-xl font-mono">{assignment.description}</h2>
                {assignment.totalFeedbackCount > 0 && (
                  <BarChart

                    xAxis={[{ scaleType: 'band', data: ['Reliability', 'Understandability', 'Usefulness'] }]}
                    series={[{ data: [assignment.fullReliabilityStars, assignment.fullUnderstandabilityStars, assignment.fullUsefulnessStars], label: 'Scrore' }, { data: [assignment.totalReliabilityStars, assignment.totalUnderstandabilityStars, assignment.totalUsefulnessStars], label: 'Full Score' }]}
                    width={500}
                    height={300}
                  />
                )}
                {assignment.totalFeedbackCount === 0 && <p>No feedback found</p>}
              </div>
            ))}
            {assignmentFeedbackEmotions.map((assignment, index) => (
              <div>
                <h2 className="mb-8 text-xl font-mono">{assignment.description}</h2>
                {assignment.positiveFeedbackCount !== 0 || assignment.negativeFeedbackCount !== 0 ? (
                  <div className='w-full xl:w-2/3 mx-auto'>
                    <PieChart
                      series={[
                        {
                          data: [{ id: 0, value: assignment.positiveFeedbackCount, label: 'Positive Feedback' },
                          { id: 1, value: assignment.negativeFeedbackCount, label: 'Negative Feedback' },],
                          highlightScope: { faded: 'global', highlighted: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -20, color: 'gray' },
                        },
                      ]}
                      height={isSmallScreen ? 100 : isMediumScreen ? 200 : 250}
                    />
                  </div>
                ) : (
                  <p>No Feedback found</p>
                )}
              </div>
            )
            )
            }

          </div>
        )}
        {chart === 4 && (
          <div className='flex justify-center items-center'>
            <div className='w-full'>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: classPositiveFeedback, label: 'Positive Feedback' },
                      { id: 1, value: classNegativeFeedback, label: 'Negative Feedback' },
                    ],
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -20, color: 'gray' },
                  },
                ]}
                height={isSmallScreen ? 100 : isMediumScreen ? 200 : 250}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )

}

export default MentorAnalytics