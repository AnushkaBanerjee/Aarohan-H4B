import React, { useEffect, useState } from 'react'
import Banner from '../../../../components/Global/Banner/Banner'
import { Chip, Button } from '@nextui-org/react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from './Submodules/Accordion';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@nextui-org/react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { Backend_url } from "../../../../../BackendUrl"
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';


function StudentRoadmap() {

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [semester, setSemester] = useState()
  const [course, setCourse] = useState()
  const [duration, setDuration] = useState()
  const [study_time_per_day, setStudy_time_per_day] = useState()
  const [roadmap, setRoadmap] = useState()

  const [inputSemester, setInputSemester] = useState()
  const [inputCourse, setInputCourse] = useState()
  const [inputDuration, setInputDuration] = useState()
  const [inputStudy_time_per_day, setInputStudy_time_per_day] = useState()
  const [selectedSubject, setSelectedSubject] = useState()

  const [generatedRoadmap, setGeneratedRoadmap] = useState([])


  const generatePath = async () => {
    setIsLoading(true);
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error('Access token not found');
        return null;
      }

      const response = await axios.post(
        `${Backend_url}/api/v1/roadmaps/generate-roadmap`,
        {
          text: inputCourse,
          hour: parseInt(inputStudy_time_per_day),
          deadline: parseInt(inputDuration),
          semester: parseInt(inputSemester)
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      const tempRoadmap = response.data.data.roadmap?.map((week) => {
        return {
          week: week.week,
          desctiption: week.work.desctiption,
          names: week.work.names,
          todo: week.work.todo
        };
      });

      setGeneratedRoadmap(tempRoadmap);
      setSelectedSubject(response.data.data.subject);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const saveRoadmap = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error('Access token not found');
        return null;
      }

      const steps = [];
      generatedRoadmap.forEach((step, index) => {
        steps.push({
          topic: selectedSubject,
          step: index + 1,
          description: step.desctiption,
          todo: step.todo,
          names: step.names
        });
      });

      const response = await axios.post(`${Backend_url}/api/v1/roadmaps/create-roadmap`, {
        roadmap: steps,
        subject: selectedSubject
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  }


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

  const [topic, setTopic] = useState('');

  const getRoadmap = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }
      const response = await axios.get(`${Backend_url}/api/v1/roadmaps/get-roadmap`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const createdEvents = []
      setTopic(response.data.data.roadmap[0].topic);
      response.data.data.roadmap.map((event, index) => {
        createdEvents.push({
          week: event.index,
          desctiption: event.description,
          names: event.names,
          todo: event.todo,
          marks: event.marks,
          fullMarks: event.fullMarks,
          status: event.status,
          _id: event._id,
        });
      })
      setRoadmap(createdEvents);
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      getRoadmap();
      setCourse(topic)

    }
    fetchData()
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure();
  const openGen = () => {
    onOpen();
  }

  const deleteRoadmap = async () => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }
      const response = await axios.delete(`${Backend_url}/api/v1/roadmaps/delete-roadmap`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getRoadmap();
      window.location.reload();
    } catch (error) {
      console.error(error);
      getRoadmap();
    }
  }


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
      <Banner mentor="Student" classroom="and Generate Your Personalized Roadmap" />
      <div className="flex-col space-y-6 px-4 py-8 gap-11 lg:p-4 bg-white-default rounded-md">
        <div className='text-center'>
          <h1 className="text-xl">My RoadMap</h1>
        </div>
        {roadmap &&<div>
          <div>
            <Chip color="primary" className="m-1">Course</Chip>
            <Chip color="primary" variant='flat' className="m-1">{topic}</Chip>
          </div>
        </div>}





        <div className='text-left bg-white-default'>
          <Timeline sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}>
            {roadmap?.map((week, index) => (


              <TimelineItem key={week.week}>
                <TimelineSeparator >
                  {week.status !== "pending" && <TimelineDot color='success'>
                    <CheckCircleIcon />
                  </TimelineDot>}
                  {week.status === "pending" && <TimelineDot color='warning'>
                    <QueryBuilderIcon />
                  </TimelineDot>}
                  {index !== roadmap.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Accordion marks={week.marks} fullMarks={week.fullMarks} status={week.status} _id={week._id} week={week.week} description={week.desctiption} names={week.names} todo={week.todo} isPermanent={true} getRoadmap={getRoadmap} />
                </TimelineContent>
              </TimelineItem>

            ))}
          </Timeline>
        </div>
        <div className='sm:flex sm:justify-between space-y-4 sm:space-y-0'>
          <div><Button color="danger" variant="bordered" startContent={<DeleteIcon />} onClick={deleteRoadmap}>
            Delete Roadmap
          </Button></div>

          <div><Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white-default shadow-lg" onClick={openGen} startContent={<AutoFixHighIcon />}>
            Generate RoadMap
          </Button></div>
        </div>

        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} scrollBehavior="inside" className='h-auto my-auto' size="lg">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Generate Roadmap</ModalHeader>
                <ModalBody>
                  <div className='space-y-4'>
                    <Input
                      type="text"
                      label="Subject"
                      variant="bordered"
                      className=""
                      color='primary'
                      value={inputCourse}
                      onChange={(e) => setInputCourse(e.target.value)}
                    />
                    <Input
                      type="number"
                      label="Deadline in weeks"
                      variant="bordered"
                      className=""
                      color='primary'
                      value={inputDuration}
                      onChange={(e) => setInputDuration(e.target.value)}
                    />
                    <Input
                      type="number"
                      label="Hours per day"
                      variant="bordered"
                      className=""
                      color='primary'
                      value={inputStudy_time_per_day}
                      onChange={(e) => setInputStudy_time_per_day(e.target.value)}
                    />
                    <Input
                      type="number"
                      label="Semester"
                      variant="bordered"
                      className=""
                      color='primary'
                      value={inputSemester}
                      onChange={(e) => setInputSemester(e.target.value)}
                    />
                    <div className='text-center'>
                      {isLoading && <Button color="primary" isLoading>
                        Generate Roadmap
                      </Button>}
                      {!isLoading && <Button color="primary" onClick={generatePath}>
                        Generate Roadmap
                      </Button>}
                    </div>
                  </div>


                  {generatedRoadmap?.map((week, index) => (



                    <Accordion key={index} week={week.week} description={week.desctiption} names={week.names} todo={week.todo} isPermanent={false} />


                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="success" variant="solid" onClick={() => {
                    saveRoadmap();
                  }}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

      </div>
    </div>
  )
}

export default StudentRoadmap