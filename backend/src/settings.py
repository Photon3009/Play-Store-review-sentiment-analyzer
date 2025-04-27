from enum import Enum
from pydantic_settings import BaseSettings  # Updated import

from dotenv import load_dotenv

# Load the environment variables from the .env file so that they can be accessed using `os.getenv`
load_dotenv()


class Environment(str, Enum):
    DEVELOPMENT = "development"
    STAGING = "staging"
    PRODUCTION = "production"
    TESTING = "testing"


class Settings(BaseSettings):
    ENVIRONMENT: Environment
    GEMINI_API_KEY: str
    GEMINI_API_URL: str

    class Config:
        env_file = ".env"


# Instantiate the settings class to load the values
settings = Settings()