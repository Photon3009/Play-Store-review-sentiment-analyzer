# app_router.py
from fastapi import APIRouter
from services.sentiment_service import analyze_sentiment
import logging

# Create a new API router for sentiment analysis
router = APIRouter()

# Setup logger for application-wide logging
logger = logging.getLogger(__name__)

# Ensure that the logger outputs to the console or a file
logger.setLevel(logging.DEBUG)


# API endpoint to analyze the sentiment of multiple reviews
@router.post("/analyze-sentiment")
async def analyze_sentiment_api(reviews: list[str]):
    # Use the service to analyze sentiment
    sentiment_data = await analyze_sentiment(reviews)

    # Log and return the result from the sentiment service
    logger.info(f"Sentiment analysis completed for {len(reviews)} reviews.")
    return sentiment_data
