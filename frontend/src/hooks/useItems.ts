import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { Item, ItemCreate, ItemUpdate } from '../types';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getItems();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData: ItemCreate): Promise<Item | null> => {
    setLoading(true);
    setError(null);
    try {
      const newItem = await apiService.createItem(itemData);
      setItems((prev) => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: number, itemData: ItemUpdate): Promise<Item | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedItem = await apiService.updateItem(id, itemData);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
};
