# app_router.py
from fastapi import APIRouter
from services.play_store_service import search_apps, fetch_reviews
import logging

# Create a new API router instance for the app
router = APIRouter()

# Logger configuration
logging.basicConfig(level=logging.INFO)  # Set logging level to INFO
logger = logging.getLogger(__name__)  # Create a logger for the module

# API endpoint to search for apps based on a query
@router.get("/search-apps")
async def search_apps_api(query: str):
    try:
        # Use the service to search for apps
        apps = await search_apps(query)
        
        # Check if there was an error
        if isinstance(apps, dict) and "error" in apps:
            return {"error": apps["error"]}

        # Log and return the results
        logger.info(f"Found {len(apps)} apps.")
        return {"apps": apps}

    except Exception as e:
        logger.error(f"Error occurred while searching for apps: {e}")
        return {"error": str(e)}

# API endpoint to fetch reviews for a specific app by its appId
@router.get("/fetch-reviews")
async def fetch_reviews_api(app_id: str):
    try:
        # Use the service to fetch reviews for the app
        reviews_data = await fetch_reviews(app_id)

        # Check if there was an error
        if isinstance(reviews_data, dict) and "error" in reviews_data:
            return {"error": reviews_data["error"]}

        # Log and return the reviews
        logger.info(f"Fetched {len(reviews_data)} reviews for appId: {app_id}")
        return {"reviews": reviews_data}

    except Exception as e:
        logger.error(f"Error occurred while fetching reviews for appId {app_id}: {e}")
        return {"error": str(e)}
