import React, { useState } from 'react';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Paper, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Backend_url } from '../../../../../../../../BackendUrl';


const TestContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(4),
  width: '100%',


}));

const Test = ({ questions,id }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(Number(event.target.value));
  };

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

  const handleNextQuestion = async() => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        const accessToken = getCookie("accessToken");
        if (!accessToken) {
          console.error("Access token not found");
          return null;
        }
        const response = await axios.patch(`${Backend_url}/api/v1/roadmaps/update-marks-roadmap?roadmapId=${id}&marks=${score}`, {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
      } catch (error) {
        console.log(error);
      }
      setShowResults(true);
    }
  };

  return (
    <TestContainer className="w-full md:w-3/4 lg:w-1/2">
      {showResults ? (
        <>
          <Typography variant="h4" className="text-center font-inter">
            Your score is {score}/{questions.length}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { navigate('/Student/Roadmap') }}
          >
            Back to Your Roadmaps
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom className="text-center font-inter">
            {questions[currentQuestionIndex].question}
          </Typography>
          <FormControl component="fieldset" className="w-full">
            <FormLabel component="legend" className="mb-4 text-center" sx={{ fontSize: '22px' }}>Choose an option</FormLabel>
            <RadioGroup value={selectedOption} onChange={handleOptionChange} className="w-full">
              <Grid container spacing={2}>
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <Grid item xs={12} key={index}>
                    <FormControlLabel
                      value={index}
                      control={<Radio />}
                      label={option}
                      className="w-full px-20"
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
          <Box mt={4} className="w-full flex justify-center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
            </Button>
          </Box>
        </>
      )}
    </TestContainer>
  );
};

export default Test;
