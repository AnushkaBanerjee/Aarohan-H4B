
from transformers import pipeline

# Load sentiment analysis pipeline
sent_pipeline = pipeline("sentiment-analysis")

async def analyze_sentiment(text: str):
    # Perform sentiment analysis
    output = sent_pipeline(text)
    # Extract sentiment label from the output
    sentiment_label = output[0]['label']
    return {"emotion": sentiment_label}
