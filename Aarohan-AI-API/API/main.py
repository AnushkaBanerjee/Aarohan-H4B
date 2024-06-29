import os
import sys
from fastapi import FastAPI
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from RoadmapGenerator.main import generateRoadmap,generateQuestion,load_chats,makeJSON,JSONFORMAT,QUESTIONANSWERFORMAT
from Sentiment_Analysis.app import analyze_sentiment
load_chats()

app = FastAPI()

@app.post('/generate-roadmap')
async def genRoadmap(timeAvailable:int, subject:str, semester:int, studytimeDaily:float):
    print(timeAvailable, subject, semester, studytimeDaily)
    try:
      unit = "week"
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
      print(roadmap_json)
      return roadmap_json
    except Exception as e:
       print('Meh')

@app.post('/analyze-sentiment')
async def analyze_sentiment(text: str):
    try:
      sentiment = analyze_sentiment(text)
      
      return json.dumps(sentiment)
    
    except Exception as e:
       print('Meh')

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app,host='0.0.0.0',port=5000)
    # uvicorn main:app --port 5000 --reload --host 0.0.0.0 --proxy-headers