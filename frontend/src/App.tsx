
import { useState, useEffect } from 'react';
import { Plus, Activity, Database, Sparkles, ExternalLink } from 'lucide-react';
import { ItemList } from './components/ItemList';
import { ItemForm } from './components/ItemForm';
import { Modal } from './components/Modal';
import { ToastContainer } from './components/ToastContainer';
import { Dashboard } from './components/Dashboard';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useItems } from './hooks/useItems';
import { useToast } from './hooks/useToast';
import { useModal } from './hooks/useModal';
import { apiService } from './services/api';
import type { Item, ItemCreate, ItemUpdate } from './types';

function App() {
  const { items, loading, error, createItem, updateItem, deleteItem, fetchItems } = useItems();
  const { toasts, success, error: showError, removeToast } = useToast();
  const deleteModal = useModal();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const [healthStatus, setHealthStatus] = useState<{
    api: string | null;
    db: string | null;
  }>({ api: null, db: null });

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    try {
      const apiHealth = await apiService.healthCheck();
      setHealthStatus((prev) => ({ ...prev, api: apiHealth.status }));
    } catch (err) {
      setHealthStatus((prev) => ({ ...prev, api: 'unhealthy' }));
    }

    try {
      const dbHealth = await apiService.dbHealthCheck();
      setHealthStatus((prev) => ({ ...prev, db: dbHealth.database }));
    } catch (err) {
      setHealthStatus((prev) => ({ ...prev, db: 'disconnected' }));
    }
  };

  const handleSubmit = async (data: ItemCreate | ItemUpdate) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, data as ItemUpdate);
        success('Élément modifié avec succès !');
      } else {
        await createItem(data as ItemCreate);
        success('Élément créé avec succès !');
      }
      setShowForm(false);
      setEditingItem(null);
    } catch (err) {
      showError('Erreur lors de l\'enregistrement');
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteClick = (item: Item) => {
    setItemToDelete(item);
    deleteModal.open();
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        await deleteItem(itemToDelete.id);
        success('Élément supprimé avec succès !');
        deleteModal.close();
        setItemToDelete(null);
      } catch (err) {
        showError('Erreur lors de la suppression');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);

  return (
    <div className="min-h-screen">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Confirmer la suppression"
      >
        <p className="text-gray-600 dark:text-gray-300">
          Êtes-vous sûr de vouloir supprimer <strong>"{itemToDelete?.title}"</strong> ?
          Cette action est irréversible.
        </p>
        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={deleteModal.close}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </Modal>

      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FastAPI React Starter
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Starter kit fullstack avec monitoring ELK
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="hidden md:flex gap-2 items-center">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    healthStatus.api === 'healthy'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}
                >
                  <Activity size={12} />
                  API
                </div>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    healthStatus.db === 'connected'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}
                >
                  <Database size={12} />
                  DB
                </div>
              </div>

              <button
                onClick={checkHealth}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg"
              >
                <Activity size={16} />
                <span className="hidden sm:inline">Health</span>
              </button>

              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Nouveau</span>
                </button>
              )}

              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showForm && <Dashboard items={items} loading={loading} />}

        {showForm && (
          <div className="mb-8 animate-fade-in">
            <ItemForm
              item={editingItem}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        )}

        {!showForm && (
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Mes Éléments
            </h2>
            <button
              onClick={fetchItems}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Actualiser
            </button>
          </div>
        )}

        <ItemList
          items={items}
          onDelete={handleDeleteClick}
          onEdit={handleEdit}
          loading={loading}
        />
      </main>

      <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center md:text-left text-gray-600 dark:text-gray-400">
              FastAPI + React + ELK Stack
            </p>
            <div className="flex gap-4 items-center">
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>API Docs</span>
                <ExternalLink size={14} />
              </a>
              <a
                href="http://localhost:5601"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>Kibana</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
