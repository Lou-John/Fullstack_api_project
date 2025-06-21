import React, { useEffect, useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import Badge from "../../components/UI/Badge";
import Modal from "../../components/UI/Modal";
import { Component } from "../../types";
import { components, categories } from "../../data/mockData";
import { componentsAPI } from "../../services/api";

const ComponentsPage: React.FC = () => {
  const [componentsList, setComponentsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      try {
        const data = await componentsAPI.getAll();
        setComponentsList(data);
      } catch (error) {
        console.error("Erreur lors du chargement des composants :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComponents();
  }, []);

  console.log("components:", componentsList);

  const [selectedCategorie, setSelectedCategorie] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<any | null>(
    null
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredComponents = componentsList.filter((component) => {
    const matchesCategorie =
      selectedCategorie === "all" || component.categorie === selectedCategorie;
    const matchesSearch =
      component.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.marque.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategorie && matchesSearch;
  });

  const handleDeleteComponent = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce composant ?")) {
      try {
        await componentsAPI.delete(id);
        setComponentsList((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        alert("Erreur lors de la suppression du composant");
      }
    }
  };

  const handleAddComponent = async (newComponent: Component) => {
    try {
      const created = await componentsAPI.create(newComponent);
      setComponentsList((prev) => [...prev, created]);
      setShowAddModal(false);
    } catch (error) {
      alert("Erreur lors de l'ajout du composant");
    }
  };

  const handleUpdateComponent = async (
    id: string,
    updatedComponent: Component
  ) => {
    try {
      const updated = await componentsAPI.update(id, updatedComponent);
      setComponentsList((prev) => prev.map((c) => (c.id === id ? updated : c)));
      setShowDetailsModal(false);
    } catch (error) {
      alert("Erreur lors de la modification du composant");
    }
  };

  const handleViewDetails = (component: Component) => {
    setSelectedComponent(component);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestion des composants
        </h1>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={20} className="mr-2" />
          Ajouter un composant
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher un composant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedCategorie}
              onChange={(e) => setSelectedCategorie(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Components List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <Card key={component.id} className="overflow-hidden">
            <img
              src={component.image}
              alt={component.titre}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {component.titre}
                  </h3>
                  <p className="text-sm text-gray-600">{component.marque}</p>
                </div>
                <Badge variant="secondary">{component.categorie.nom}</Badge>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {component.Details}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  {component.prix}€
                </span>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleViewDetails(component)}
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
                  onClick={() => handleDeleteComponent(component.id)}
                  className="px-3"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">
            Aucun composant trouvé avec les filtres actuels.
          </p>
        </Card>
      )}

      {/* Add Component Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un composant"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marque
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                {categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix de base (€)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter le composant</Button>
          </div>
        </form>
      </Modal>

      {/* Component Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Détails du composant"
        size="lg"
      >
        {selectedComponent && (
          <div className="space-y-6">
            <div className="flex items-start space-x-6">
              <img
                src={selectedComponent.image}
                alt={selectedComponent.titre}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedComponent.titre}
                </h3>
                <p className="text-gray-600 mb-2">
                  {selectedComponent.marque}
                </p>
                <Badge variant="secondary">
                  {selectedComponent.categorie.nom}
                </Badge>
                <p className="text-2xl font-bold text-blue-600 mt-3">
                  {selectedComponent.prix}€
                </p>
              </div>
            </div>
 {/*
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                Description
              </h4>
              <p className="text-gray-600">{selectedComponent.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                Spécifications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(selectedComponent.specifications).map(
                  ([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                      <dt className="text-sm font-medium text-gray-700">
                        {key}
                      </dt>
                      <dd className="text-sm text-gray-900">{value}</dd>
                    </div>
                  )
                )}
              </div>
            </div>
            */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ComponentsPage;
