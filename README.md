# Aarohan: Upgrading the future of education with the power of Artificial Intelligence.

## Introduction:

### Aarohan is a unique AI powered, virtual-learning platform that harnesses the latest modern Artificial Intelligence models to *statistically analyze student performance and teacher feedbacks respectively, integrate them with respect to the student's individual learning interests, capacity and teacher's feedback to statistically provide them with the best study materials, roadmaps, performance and sentiment analysis* to help each of them receive quality education and improve themselves further according to their personalized learning capacities.

##

## Continue Reading....

[Our Goals](#our-goals) | [Features]() | [Getting Started (build) ]()

# Our Goals:

- Empowering education by helping each student customize their learning experience through comprehensive data analysis, leveraging state of the art AI and ML modules for dynamic personalized learning paths, real time adjustments based of feedback, performance visualization and much more.
  
- We strive to liberate students to think for themselves by learning to analyze how they are doing and take their own decisions, instead of just relying on what they are told and made to believe.
  

# Features:

## Stable Features:

- **AI powered continuous student performance analysis** with every solved assignment and student** data analysis for identification of strong and weak topics and **generate relevant suggestions**.
  
- **AI powered user-data specific roadmap generation** for completion within a limited time with enhanced details on topics to be covered and emphasized on.
  
- **Continuous assessments on each topic** generated within the roadmap to make determine clarity developed on each topic.
  
- **Live graphical comparison and display** of performance data
  
- **AI powered sentiment analysis and performance analysis and prediction**.
  
- **Full fledged virtual classroom integration** with teacher and student roles for individual uses. Teachers are permitted to** create courses, assignments and upload materials** while students are permitted to **join courses according to their syllabus and interests, solve and upload assignments** and refer to the materials for help.
  
- **Instant meeting creation** and joining feature **all integrated in a single place** with no external distractions.
  

## Experimental Features:

- Callchimp API and SDK implementation to call up and **remind defaulters about assignment submission automatically without human involvement** all with a single click.
  
- **Live sentiment analysis and suggestions** based on current data,
  

# Getting Started:

#### Here is a comprehensive guide on how to build Aarohan in your local environment. There are 3 steps involved, enabling API services, enabling the backend and enabling the frontend, all of which are covered in the steps that follow.

### Before starting out with anything clone the main branch of Aarohan using:

```bash
git clone https://github.com/AnushkaBanerjee/Aarohan-H4B.git
```

1. ### Enabling API Services:
  
  - Step 1: Move into the Aarohan-H4B/Aarohan-AI-API using
    
  - ```bash
    cd Aarohan-H4B/Aarohan-AI-API
    ```
    
  - Create a virtual environment , activate it and install the dependencies
    
  - ```bash
    virtualenv venv # if not available install using pip install virtualenv
    
    #windows
    .\venv\Scripts\activate.bat
    
    #macOS or Linux
    source venv/bin/activate
    ```
    
  - Install the dependencies from the requirements.txt file using
    
  - ```bash
    pip install -r requirements.txt
    ```
    
  - Finally type in this command to starte the server, server will start as soon as all the files are loaded.
    
  - ```bash
    python API/main.py
    ```
    
2. ## Setting up the Backend:
  
3. ### Setting Up the frontend:
  
  - ```bash
    cd Aarohan-Client
    npm i
    ```
    
  - To start the server execute:
    
  - ```bash
    npm run dev
    ```
  - And you are good to go
