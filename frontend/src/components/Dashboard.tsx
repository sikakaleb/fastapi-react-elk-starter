
import { Package, TrendingUp, Clock, Activity } from 'lucide-react';
import { StatsCard } from './StatsCard';
import type { Item } from '../types';

interface DashboardProps {
  items: Item[];
  loading: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ items, loading }) => {
  const totalItems = items.length;
  const recentItems = items.filter(
    (item) => new Date(item.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
  ).length;
  const avgItemsPerDay = totalItems > 0 ? (totalItems / 30).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Items"
        value={loading ? '...' : totalItems}
        icon={Package}
        color="blue"
        trend={totalItems > 0 ? { value: 12, isPositive: true } : undefined}
      />
      <StatsCard
        title="Cette semaine"
        value={loading ? '...' : recentItems}
        icon={TrendingUp}
        color="green"
      />
      <StatsCard
        title="Moyenne/jour"
        value={loading ? '...' : avgItemsPerDay}
        icon={Clock}
        color="purple"
      />
      <StatsCard
        title="Statut"
        value={loading ? '...' : 'Actif'}
        icon={Activity}
        color="orange"
      />
    </div>
  );
};
