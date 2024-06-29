import os
import sys
from fastapi import FastAPI

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from roadmap import generateRoadmap,generateQuestion,load_chats,makeJSON,JSONFORMAT,QUESTIONANSWERFORMAT
load_chats()

app = FastAPI()

@app.post('/generate-roadmap')
async def genRoadmap(timeAvailable:int, unit:str, subject:str, semester:int, studytimeDaily:float):
    try:
      roadmap_text = generateRoadmap(timeAvailable,unit,subject,semester,studytimeDaily,JSONFORMAT)
      # convert text to json
      roadmap_json = makeJSON(roadmap_text)
      return roadmap_json
    except Exception as e:
       print('Meh')

@app.post('/generate-question')
async def genQuestion(subject:str, semester:int, subtopics:str):
    try:
      roadmap_text = generateQuestion(subject,semester,subtopics,QUESTIONANSWERFORMAT)
      # convert text to json
      roadmap_json = makeJSON(roadmap_text)
      return roadmap_json
    except Exception as e:
       print('Meh')


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app,host='0.0.0.0',port=5000)
