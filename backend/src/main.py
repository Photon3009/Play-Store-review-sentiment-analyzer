from fastapi import FastAPI
from routers.review_routes import router as review_router
from routers.sentiment_routes import router as sentiment_router
from fastapi.middleware.cors import CORSMiddleware
import logging
import core.routers as core_router

# Setup logging for FastAPI and application-wide logging
logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(message)s",  # Log format with time, level, message
    level=logging.DEBUG  # You can change the level to INFO or WARNING based on your needs
)

# Create a logger for your application
logger = logging.getLogger(__name__)
logger.info("Starting the server...")


app = FastAPI(
    title="Google Play Store Sentiment Analysis",
    description="A powerful tool that analyzes sentiments of reviews for Google Play Store apps, helping developers understand user feedback and improve app experiences.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=core_router.router, prefix="/v1", tags=["Core"])

app.include_router(review_router, prefix="/v1", tags=["Reviews"])

app.include_router(sentiment_router, prefix="/v1", tags=["Sentiment"])
