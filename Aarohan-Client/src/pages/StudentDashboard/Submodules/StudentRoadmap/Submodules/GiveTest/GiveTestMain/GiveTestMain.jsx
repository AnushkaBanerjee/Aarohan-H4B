import React from 'react';
import Test from '../TestComponent/Test';
import { Container } from '@mui/material';
import { Spinner } from "@nextui-org/spinner";

import banner from '../../../../../../../assets/Banner/banner.png';
import { Button } from "@nextui-org/react";
const student = "Student";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Backend_url } from "../../../../../../../../BackendUrl";

function GiveTest() {

  const [questions, setQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();

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

  const getQuestions = async () => {
    try {
      setLoading(true);
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.post(`${Backend_url}/api/v1/roadmaps/generate-questions?roadmapId=${id}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setQuestions(response.data.data.questions.questions);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center">
      <div className="w-full px-4 md:px-28">

        <div className='w-full'>
          <div className="h-48  rounded-md bg-cover bg-no-repeat my-4 flex justify-center items-center"
            style={{ backgroundImage: `url(${banner})` }}>

            <div className=''>
              <div className='text-center'>
                <h1 className=" text-white-default text-4xl font-semibold mb-4">Hi, {student}</h1>
              </div>
              <div className='text-center'>
                <h1 className="text-white-default text-xl mb-6">Test Your Progress</h1>
              </div>
              <div className='flex justify-center items-center'>
                {questions.length === 0 && <Button variant="bordered" className='text-white-default text-lg'
                  onClick={getQuestions}>
                  Generate Questions
                </Button>}
              </div>
            </div>

          </div>
        </div>


      </div>
      <Container className="rounded-md flex flex-grow justify-center items-center mb-11">
        {questions.length > 0 && <Test questions={questions} id={id} />}
        <div className='flex items-center mx-auto justify-center '>
          {loading && <Spinner size="lg" />}
        </div>
      </Container>
    </div>
  );
}

export default GiveTest;
