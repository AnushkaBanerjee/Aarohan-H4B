import React, { useState } from 'react';
import Banner from '../../../../components/Global/Banner/Banner';
import { Tabs, Tab, Card, CardBody, Tooltip, Chip } from "@nextui-org/react";
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import TimelineIcon from '@mui/icons-material/Timeline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import useWindowDimensions from '../../../../components/Util/UseWindowDimensions';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import StatCard from '../../../../components/Global/StatCard/StatCard';
import { Backend_url } from '../../../../../BackendUrl';
import axios from 'axios';
import { useEffect } from 'react';

function StudentProgress() {

  const [data, setData] = useState(null);
  const [lineMarks, setLineMarks] = useState([]);
  const [lineWeeks, setLineWeeks] = useState([]);
  const [lineFullMarks, setLineFullMarks] = useState([]);
  const [markedAssignments, setMarkedAssignments] = useState(0);
  const [unmarkedAssignments, setUnmarkedAssignments] = useState(0);
  const [missedAssignments, setMissedAssignments] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

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
    const getStudentAnalytics = async () => {
      try {
        const accessToken = getCookie('accessToken');
        if (!accessToken) {
          console.error("Access token not found");
          return null;
        }

        const response = await axios.get(`${Backend_url}/api/v1/users/get-analytics`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const studentAnalytics = response.data.data;

        const marks = [];
        const weeks = [];
        const fullMarks = [];
        let count_mark = 0;
        let count_unmark = 0;

        studentAnalytics.assignmentGraph.forEach(performance => {
          if (performance.marks !== "unmarked") {
            marks.push(parseInt(performance.marks));
            const date = new Date(performance.createdAt);
            const week = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
            weeks.push(week);
            fullMarks.push(parseInt(performance.fullMarks));
            count_mark++;
          }
          else {
            count_unmark++;
          }
        });

        setMarkedAssignments(count_mark);
        setUnmarkedAssignments(count_unmark);
        setLineMarks(marks);
        setLineWeeks(weeks);
        setLineFullMarks(fullMarks);

        setData({
          numberOfClasses: studentAnalytics.numberOfClasses,
          pendingAssignments: studentAnalytics.pendingAssignments,
          upcomingLiveSessions: studentAnalytics.upcomingLiveSessions,
          assignmentsAssigned: studentAnalytics.assignmentsAssigned,
          assignmentsSubmitted: studentAnalytics.assignmentsSubmitted,
          progressInPath: studentAnalytics.progressInPath,
        });

        setAccuracy(studentAnalytics.accuracy);

      } catch (error) {
        console.error(error);
      }
    };

    getStudentAnalytics();
  }, []);

  const { width } = useWindowDimensions();
  const [chart, setChart] = useState(1);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // const times = [
  //   new Date('2024-05-25T11:51:33').toLocaleString('en-GB'),
  //   new Date('2024-06-25T12:51:33').toLocaleString('en-GB'),
  //   new Date('2024-06-25T13:51:33').toLocaleString('en-GB'),
  //   new Date('2024-06-25T14:51:33').toLocaleString('en-GB'),
  //   new Date('2024-06-25T15:51:33').toLocaleString('en-GB'),
  //   new Date('2024-06-25T16:51:33').toLocaleString('en-GB'),
  //   new Date('2024-07-25T17:51:33').toLocaleString('en-GB')
  // ];
  const pieData = [
    { id: 0, value: data?.assignmentsAssigned - data?.assignmentsSubmitted, label: 'Pending' },
    { id: 1, value: markedAssignments, label: 'Marked' },
    { id: 2, value: data?.assignmentsSubmitted - markedAssignments, label: 'Submitted' },
  ];

  return (
    <div style={{
      height: "calc(100vh - 4.3rem)",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      overflowY: "scroll",
      overflowX: "hidden",
      background: "#EDE9E9"
    }}>
      <Banner mentor="Student" classroom="My Progress" />
      <div className="rounded-md bg-cover bg-no-repeat flex justify-center items-center p-4">
        <Tabs
          aria-label="Options"
          placement='top'
          color='primary'
          className='flex justify-center '
          onSelectionChange={(key) => setChart(Number(key))}
        >
          <Tab key="1" title={
            width < 800 ? <Tooltip key="overview" color="primary" content="Overview" className="capitalize"><PlagiarismIcon /></Tooltip> :
              <div className="flex items-center space-x-2">
                <PlagiarismIcon />
                <span>Overview</span>
              </div>
          } />
          <Tab key="2" title={
            width < 800 ? <Tooltip key="accuracy" color="primary" content="Accuracy" className="capitalize"><NetworkCheckIcon /></Tooltip> :
              <div className="flex items-center space-x-2">
                <NetworkCheckIcon />
                <span>Accuracy</span>
              </div>
          } />
          <Tab key="3" title={
            width < 800 ? <Tooltip key="performance" color="primary" content="Performance" className="capitalize"><TimelineIcon /></Tooltip> :
              <div className="flex items-center space-x-2">
                <TimelineIcon />
                <span>Performance</span>
              </div>
          } />
          <Tab key="4" title={
            width < 800 ? <Tooltip key="submissions" color="primary" content="Submissions" className="capitalize"><DriveFolderUploadIcon /></Tooltip> :
              <div className="flex items-center space-x-2">
                <DriveFolderUploadIcon />
                <span>Submissions</span>
              </div>
          } />
          <Tab key="5" title={
            width < 800 ? <Tooltip key="aiSuggestions" color="primary" content="AI Suggestions" className="capitalize"><AutoFixHighIcon /></Tooltip> :
              <div className="flex items-center space-x-2">
                <AutoFixHighIcon />
                <span>AI Suggestions</span>
              </div>
          } />
        </Tabs>
      </div>
      <div className='bg-white-default p-4 rounded-md h-auto  items-center'>
        {chart === 1 && (<div className="container items-center px-4 py-8 m-auto">
          <div className="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">

            <StatCard value={data?.numberOfClasses} title="Number of Classes" />
            <StatCard value={data?.pendingAssignments} title="Pending Assignments" />
            <StatCard value={data?.upcomingLiveSessions} title="No of Upcoming Live Sessions" />
            <StatCard value={data?.assignmentsAssigned} title="Assignments Assigned" />
            <StatCard value={data?.assignmentsSubmitted} title="Assignments Submitted" />
            <StatCard value={`${data?.progressInPath}%`} title="Progress in Path" />



          </div>
        </div>)}
        {chart === 2 && (
          <div className='text-center md:flex md:justify-center'>
            <div className='md:mr-16'>
              <Gauge
                value={accuracy}
                startAngle={-110}
                endAngle={110}
                sx={{
                  width: isMediumScreen ? 200 : 350,
                  height: isMediumScreen ? 200 : 350,
                  marginX: 'auto',
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: isMediumScreen ? 20 : 35,
                    transform: 'translate(0px, 0px)',
                  },
                }}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Accuracy Meter
              </Typography>
            </div>
            {/* <div>
              <Gauge
                value={75}
                startAngle={-110}
                endAngle={110}
                sx={{
                  width: isMediumScreen ? 200 : 350,
                  height: isMediumScreen ? 200 : 350,
                  marginX: 'auto',
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: isMediumScreen ? 20 : 35,
                    transform: 'translate(0px, 0px)',
                  },
                }}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Feedback Meter
              </Typography>
            </div> */}
          </div>
        )}
        {chart === 3 && (
          <div className='text-center'>
            <Typography variant="h6" component="div" sx={{ m: 2, textAlign: "left", paddingLeft: "10px" }}>
              Performance
            </Typography>
            <LineChart
              grid={{ horizontal: true }}
              xAxis={[
                {
                  scaleType: 'point',
                  data: lineWeeks,
                  label: 'Time',// Adjust this value if needed
                },
              ]}
              yAxis={[
                { id: 'Full Marks', scaleType: 'linear' },
                { id: 'Obtained Marks', scaleType: 'linear' },
              ]}
              series={[
                { yAxisKey: 'Full Marks', data: lineFullMarks, label: 'Full Marks' },
                { yAxisKey: 'Obtained Marks', data: lineMarks, label: 'Obtained Marks' },
              ]}
              leftAxis="Full Marks"
              rightAxis="Obtained Marks"
              height={400}
            />

          </div>
        )}
        {chart === 4 && (
          <div className='text-center'>
            <div className='text-left pl-4'>
              <h1 className='my-6 text-xl'>Submissions</h1>
            </div>

            <div className='w-full xl:w-2/3 mx-auto'>
              <PieChart
                series={[
                  {
                    data: pieData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -20, color: 'gray' },
                  },
                ]}
                height={isSmallScreen ? 100 : isMediumScreen ? 200 : 400}
              />
            </div>

          </div>
        )}
        {chart === 5 && (
          <div className='text-left pl-8'>
            <div className='text-left'>
              <h1 className='my-6 text-xl'>AI Suggestions</h1>
            </div>
            <div className='mb-4'>
            {
              data.progressInPath < 50 ?
                <Chip color="danger" variant="dot">You have to work hard to improve your Progress in roadmap</Chip>
                :
                <Chip color="success" variant="dot">You are doing well. Keep it up!</Chip>
            }
            </div>
            <div className='mb-4'>
            {
              data.pendingAssignments > 0 ?
                <Chip color="danger" variant="dot">You have pending assignments</Chip>
                :
                <Chip color="success" variant="dot">You have no pending assignments</Chip>
            }
            </div>
            <div className='mb-4'>
            {
              data.upcomingLiveSessions > 0 ?
                <Chip color="danger" variant="dot">You have upcoming live sessions</Chip>
                :
                <Chip color="success" variant="dot">You have no upcoming live sessions</Chip>
            }
            </div>
            <div className='mb-4'>
            {
              accuracy < 40 ?
                <Chip color="danger" variant="dot">Your accuracy is low. You have to improve it</Chip>
                :
                accuracy < 70 ?
                  <Chip color="warning" variant="dot">Your accuracy is average. You have to improve it</Chip>
                  :
                  <Chip color="success" variant="dot">Your accuracy is good. Keep it up!</Chip>
            }
            </div>
            <div className='mb-4'>
            {lineFullMarks[lineFullMarks.length - 1] / lineMarks[lineMarks - 1] > 30 ?
              <Chip color="danger" variant="dot">Your previous performance in assignment was poor !!</Chip>
              :
              lineFullMarks[lineFullMarks.length - 1] / lineMarks[lineMarks - 1] > 60 ?
                <Chip color="warning" variant="dot">Your previous performance in assignment was average !!</Chip>
                :
                <Chip color="success" variant="dot">Your previous performance in assignment was excellent !!</Chip>

            }
            </div>
          </div>)}
      </div>
    </div>
  );
}

export default StudentProgress;
