
import { useState, useEffect } from 'react';
import { Save, X, Sparkles } from 'lucide-react';
import type { Item, ItemCreate, ItemUpdate } from '../types';

interface ItemFormProps {
  item?: Item | null;
  onSubmit: (data: ItemCreate | ItemUpdate) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ItemForm: React.FC<ItemFormProps> = ({
  item,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formData: ItemCreate | ItemUpdate = {
      title: title.trim(),
      description: description.trim() || null,
    };

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <Sparkles className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {item ? 'Modifier l\'élément' : 'Nouvel élément'}
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Titre *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all"
            placeholder="Entrez un titre"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all resize-none"
            placeholder="Description (optionnel)"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description.length} caractères
          </p>
        </div>
      </div>

      <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all disabled:opacity-50 flex items-center gap-2 font-medium"
        >
          <X size={18} />
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Save size={18} />
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
};
