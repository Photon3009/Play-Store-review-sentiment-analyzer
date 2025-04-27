# services/play_store_service.py
from google_play_scraper import search, Sort, reviews
import logging

# Logger configuration
logger = logging.getLogger(__name__)


async def search_apps(query: str):
    try:
        logger.info(f"Searching for apps with query: '{query}'")

        # Use google_play_scraper to search for apps
        search_results = search(query, lang="en", country="us")[:5]  # Limit to 5 results
        apps = [{"title": app["title"], "appId": app["appId"]} for app in search_results]

        logger.info(f"Found {len(apps)} apps.")
        return apps
    except Exception as e:
        logger.error(f"Error occurred while searching for apps: {e}")
        return {"error": str(e)}


async def fetch_reviews(app_id: str):
    try:
        logger.info(f"Fetching reviews for appId: {app_id}")

        # Fetch the latest reviews using google_play_scraper
        result, _ = reviews(app_id, lang="en", country="us", sort=Sort.NEWEST, count=100)
        review_contents = [r["content"] for r in result]

        logger.info(f"Fetched {len(review_contents)} reviews for appId: {app_id}")
        return review_contents
    except Exception as e:
        logger.error(f"Error occurred while fetching reviews for appId {app_id}: {e}")
        return {"error": str(e)}
