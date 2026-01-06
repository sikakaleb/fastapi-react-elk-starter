
import { Trash2, Edit2, Calendar, FileText } from 'lucide-react';
import type { Item } from '../types';

interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit?: (item: Item) => void;
  loading?: boolean;
}

export const ItemList: React.FC<ItemListProps> = ({
  items,
  onDelete,
  onEdit,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-500"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-300 animate-ping"></div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center p-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <FileText className="text-gray-400" size={40} />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Aucun élément trouvé</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Créez votre premier élément pour commencer
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:-translate-y-1"
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {item.title}
            </h3>
          </div>

          {item.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {item.description}
            </p>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={14} />
              <span>{new Date(item.created_at).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all hover:scale-110"
                  aria-label="Modifier"
                >
                  <Edit2 size={18} />
                </button>
              )}
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all hover:scale-110"
                aria-label="Supprimer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
