
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate


class ItemService:
    @staticmethod
    async def create_item(db: AsyncSession, item_data: ItemCreate) -> Item:
        item = Item(
            title=item_data.title,
            description=item_data.description
        )
        db.add(item)
        await db.commit()
        await db.refresh(item)
        return item
    
    @staticmethod
    async def get_item(db: AsyncSession, item_id: int) -> Optional[Item]:
        result = await db.execute(select(Item).where(Item.id == item_id))
        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_items(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Item]:
        result = await db.execute(select(Item).offset(skip).limit(limit))
        return list(result.scalars().all())
    
    @staticmethod
    async def update_item(db: AsyncSession, item_id: int, item_data: ItemUpdate) -> Optional[Item]:
        item = await ItemService.get_item(db, item_id)
        if not item:
            return None
        
        update_data = item_data.model_dump(exclude_unset=True)
        if not update_data:
            return item
        
        await db.execute(
            update(Item)
            .where(Item.id == item_id)
            .values(**update_data)
        )
        await db.commit()
        
        return await ItemService.get_item(db, item_id)
    
    @staticmethod
    async def delete_item(db: AsyncSession, item_id: int) -> bool:
        item = await ItemService.get_item(db, item_id)
        if not item:
            return False
        
        await db.execute(delete(Item).where(Item.id == item_id))
        await db.commit()
        return True
