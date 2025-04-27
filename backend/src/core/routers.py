from logging import getLogger
from fastapi import APIRouter

logger = getLogger(__name__)

router = APIRouter()


@router.get("/health")
def health_check():
    return {"status": "ok"}