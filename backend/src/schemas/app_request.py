from pydantic import BaseModel

class AppRequest(BaseModel):
    app_name: str
