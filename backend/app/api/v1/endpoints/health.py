"""
Health check endpoint.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.session import get_db
from app.core.logger import logger

router = APIRouter()


@router.get("/")
async def health_check():
    """
    Basic health check endpoint.
    
    Returns:
        Health status
    """
    logger.info("Health check requested")
    return {
        "status": "healthy",
        "service": "fastapi-backend"
    }


@router.get("/db")
async def db_health_check(db: AsyncSession = Depends(get_db)):
    """
    Database health check endpoint.
    Verifies that the database connection is working.
    
    Args:
        db: Database session
        
    Returns:
        Database health status
    """
    try:
        # Try to execute a simple query
        result = await db.execute(text("SELECT 1"))
        result.scalar()
        
        logger.info("Database health check passed")
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }
