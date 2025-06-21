import React from 'react';
import { TrendingUp, Users, Cpu, ShoppingCart, DollarSign } from 'lucide-react';
import Card from '../../components/UI/Card';
import { components, users, configurations, partners } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Composants',
      value: components.length,
      icon: Cpu,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Utilisateurs',
      value: users.length,
      icon: Users,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Configurations',
      value: configurations.length,
      icon: ShoppingCart,
      color: 'bg-purple-500',
      change: '+23%',
      changeType: 'increase'
    },
    {
      title: 'Partenaires',
      value: partners.length,
      icon: DollarSign,
      color: 'bg-orange-500',
      change: '+5%',
      changeType: 'increase'
    }
  ];

  const recentConfigurations = configurations.slice(0, 5);
  const recentUsers = users.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <div className="text-sm text-gray-500">
          Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <div className="ml-2 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Configurations */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Configurations récentes</h2>
          <div className="space-y-4">
            {recentConfigurations.map((config) => (
              <div key={config.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{config.name}</p>
                  <p className="text-sm text-gray-600">
                    {config.components.length} composants
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{config.totalPrice}€</p>
                  <p className="text-sm text-gray-600">
                    {new Date(config.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Users */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Nouveaux utilisateurs</h2>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.configurationsCount} configs
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Popular Components */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Composants populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.slice(0, 6).map((component) => (
            <div key={component.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <img
                src={component.image}
                alt={component.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="ml-3">
                <p className="font-medium text-gray-900">{component.title}</p>
                <p className="text-sm text-gray-600">{component.category.name}</p>
                <p className="text-sm font-semibold text-blue-600">{component.basePrice}€</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;