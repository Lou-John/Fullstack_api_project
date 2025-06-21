import React, { useState } from 'react';
import { Search, Eye, Edit, Trash2, Calendar, User, DollarSign } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { Configuration } from '../../types';
import { configurations, users } from '../../data/mockData';

const ConfigurationsPage: React.FC = () => {
  const [configurationsList, setConfigurationsList] = useState<Configuration[]>(configurations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConfig, setSelectedConfig] = useState<Configuration | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredConfigurations = configurationsList.filter(config =>
    config.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteConfiguration = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette configuration ?')) {
      setConfigurationsList(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleViewDetails = (config: Configuration) => {
    setSelectedConfig(config);
    setShowDetailsModal(true);
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Utilisateur inconnu';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des configurations</h1>
        <div className="text-sm text-gray-600">
          {filteredConfigurations.length} configuration{filteredConfigurations.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher une configuration..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>

      {/* Configurations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredConfigurations.map((config) => (
          <Card key={config.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {config.name}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <User size={14} className="mr-1" />
                  {getUserName(config.userId)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {config.totalPrice}€
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {new Date(config.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Composants</h4>
              <div className="space-y-1">
                {config.components.slice(0, 3).map((comp) => (
                  <div key={comp.id} className="text-sm text-gray-600 flex items-center justify-between">
                    <span>{comp.component.title}</span>
                    <span className="font-medium">{comp.price}€</span>
                  </div>
                ))}
                {config.components.length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{config.components.length - 3} autre{config.components.length - 3 > 1 ? 's' : ''} composant{config.components.length - 3 > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleViewDetails(config)}
                className="flex-1"
              >
                <Eye size={16} className="mr-1" />
                Voir
              </Button>
              <Button size="sm" variant="secondary" className="px-3">
                <Edit size={16} />
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDeleteConfiguration(config.id)}
                className="px-3"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredConfigurations.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">Aucune configuration trouvée.</p>
        </Card>
      )}

      {/* Configuration Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Détails de la configuration"
        size="xl"
      >
        {selectedConfig && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedConfig.name}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <User size={16} className="mr-2" />
                  <span>Créée par {getUserName(selectedConfig.userId)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>{new Date(selectedConfig.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {selectedConfig.totalPrice}€
                </div>
                <div className="text-sm text-gray-500">Prix total</div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Composants sélectionnés</h4>
              <div className="space-y-4">
                {selectedConfig.components.map((comp) => (
                  <div key={comp.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 mb-1">
                          {comp.component.title}
                        </h5>
                        <p className="text-sm text-gray-600 mb-2">
                          {comp.component.brand} - {comp.component.category.name}
                        </p>
                        <div className="text-sm text-gray-500">
                          Vendu par {comp.selectedPartner.name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {comp.price}€
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-blue-800">
                  <DollarSign size={20} className="mr-2" />
                  <span className="font-medium">Prix total de la configuration</span>
                </div>
                <div className="text-2xl font-bold text-blue-800">
                  {selectedConfig.totalPrice}€
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ConfigurationsPage;