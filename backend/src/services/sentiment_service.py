# services/sentiment_service.py
import aiohttp
import logging
import asyncio
from settings import settings

# Setup logger for application-wide logging
logger = logging.getLogger(__name__)

# Ensure that the logger outputs to the console or a file
logger.setLevel(logging.DEBUG)

# Load Gemini API Key from settings
GEMINI_API_KEY = settings.GEMINI_API_KEY
if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY is not set. Please set it in environment variables."
    )

GEMINI_API_URL = settings.GEMINI_API_URL  # URL for the Gemini API

# Define headers for the API request
HEADERS = {
    "Content-Type": "application/json",
}

# Function to analyze a single review's sentiment
async def analyze_single_review(session, review_text: str):
    prompt = f"Analyze the sentiment of the following text. Respond only with 'Positive' or 'Negative'.\n\nText: {review_text}"

    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    params = {"key": GEMINI_API_KEY}

    try:
        async with session.post(GEMINI_API_URL, headers=HEADERS, params=params, json=payload) as response:
            if response.status != 200:
                error_text = await response.text()
                logger.error(f"Gemini API error - Status: {response.status}, Body: {error_text}")
                return 0  # Return 0 if there is an error

            data = await response.json()
            prediction = data["candidates"][0]["content"]["parts"][0]["text"].strip().lower()

            logger.debug(f"Prediction for review: '{review_text[:30]}...' is '{prediction}'")

            return 1 if "positive" in prediction else 0

    except Exception as e:
        logger.error(f"Error analyzing sentiment: {e}")
        return 0  # Default to neutral/negative sentiment if API fails


# Function to analyze sentiment of multiple reviews
async def analyze_sentiment(reviews: list[str]):
    if not reviews:
        logger.warning("No reviews provided for sentiment analysis.")
        return {"average_sentiment": 0, "review_count": 0}  # Default values if no reviews

    logger.info(f"Analyzing sentiment for {len(reviews)} reviews...")

    async with aiohttp.ClientSession() as session:
        tasks = [analyze_single_review(session, review) for review in reviews]
        scores = await asyncio.gather(*tasks)

    average_sentiment = sum(scores) / len(scores) if scores else 0

    logger.info(f"Sentiment analysis completed. Average Sentiment: {average_sentiment:.2f}, Reviews Analyzed: {len(scores)}")

    return {"average_sentiment": average_sentiment, "review_count": len(scores)}
