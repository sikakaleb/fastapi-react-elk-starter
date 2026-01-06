"""
Items API endpoints - CRUD operations for items.
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.schemas.item import ItemCreate, ItemUpdate, ItemResponse
from app.services.item_service import ItemService
from app.core.logger import logger

router = APIRouter()


@router.post("/", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
async def create_item(
    item_data: ItemCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new item.
    
    Args:
        item_data: Item creation data
        db: Database session
        
    Returns:
        Created item
    """
    logger.info(f"Creating item: {item_data.title}")
    item = await ItemService.create_item(db, item_data)
    logger.info(f"Item created with ID: {item.id}")
    return item


@router.get("/", response_model=List[ItemResponse])
async def get_items(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """
    Get a list of items with pagination.
    
    Args:
        skip: Number of items to skip
        limit: Maximum number of items to return
        db: Database session
        
    Returns:
        List of items
    """
    logger.info(f"Fetching items (skip={skip}, limit={limit})")
    items = await ItemService.get_items(db, skip=skip, limit=limit)
    return items


@router.get("/{item_id}", response_model=ItemResponse)
async def get_item(
    item_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get an item by ID.
    
    Args:
        item_id: Item ID
        db: Database session
        
    Returns:
        Item if found
        
    Raises:
        HTTPException: If item not found
    """
    logger.info(f"Fetching item with ID: {item_id}")
    item = await ItemService.get_item(db, item_id)
    
    if not item:
        logger.warning(f"Item not found: {item_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    
    return item


@router.put("/{item_id}", response_model=ItemResponse)
async def update_item(
    item_id: int,
    item_data: ItemUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update an existing item.
    
    Args:
        item_id: Item ID
        item_data: Item update data
        db: Database session
        
    Returns:
        Updated item
        
    Raises:
        HTTPException: If item not found
    """
    logger.info(f"Updating item with ID: {item_id}")
    item = await ItemService.update_item(db, item_id, item_data)
    
    if not item:
        logger.warning(f"Item not found for update: {item_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    
    logger.info(f"Item updated: {item_id}")
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(
    item_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Delete an item.
    
    Args:
        item_id: Item ID
        db: Database session
        
    Raises:
        HTTPException: If item not found
    """
    logger.info(f"Deleting item with ID: {item_id}")
    deleted = await ItemService.delete_item(db, item_id)
    
    if not deleted:
        logger.warning(f"Item not found for deletion: {item_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    
    logger.info(f"Item deleted: {item_id}")
