import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import Badge from "../../components/UI/Badge";
import Modal from "../../components/UI/Modal";
import { Partner } from "../../types";
import { partners } from "../../data/mockData";

const PartnersPage: React.FC = () => {
  const [partnersList, setPartnersList] = useState<Partner[]>(partners);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredPartners = partnersList.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePartner = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce partenaire ?")) {
      setPartnersList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleViewDetails = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowDetailsModal(true);
  };

  const togglePartnerStatus = (id: string) => {
    setPartnersList((prev) =>
      prev.map((partner) =>
        partner.id === id
          ? {
              ...partner,
              status: partner.status === "active" ? "inactive" : "active",
            }
          : partner
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestion des partenaires
        </h1>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={20} className="mr-2" />
          Ajouter un partenaire
        </Button>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Rechercher un partenaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {partner.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <ExternalLink size={14} className="mr-1" />
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {partner.url.replace("https://", "")}
                    </a>
                  </div>
                </div>
              </div>
              <Badge
                variant={partner.status === "active" ? "success" : "secondary"}
              >
                {partner.status === "active" ? "Actif" : "Inactif"}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Taux de commission
                </span>
                <div className="flex items-center text-green-600">
                  <TrendingUp size={14} className="mr-1" />
                  <span className="font-medium">{partner.commissionRate}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Partenaire depuis</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(partner.createdAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleViewDetails(partner)}
                className="flex-1"
              >
                <Eye size={16} className="mr-1" />
                Voir
              </Button>
              <Button
                size="sm"
                variant={partner.status === "active" ? "danger" : "success"}
                onClick={() => togglePartnerStatus(partner.id)}
                className="px-3"
              >
                {partner.status === "active" ? "Désactiver" : "Activer"}
              </Button>
              <Button size="sm" variant="secondary" className="px-3">
                <Edit size={16} />
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDeletePartner(partner.id)}
                className="px-3"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">Aucun partenaire trouvé.</p>
        </Card>
      )}

      {/* Add Partner Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un partenaire"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du partenaire
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ex: TopAchat"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL du site
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taux de commission (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL du logo
            </label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter le partenaire</Button>
          </div>
        </form>
      </Modal>

      {/* Partner Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Détails du partenaire"
        size="lg"
      >
        {selectedPartner && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={selectedPartner.logo}
                alt={selectedPartner.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedPartner.name}
                </h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <ExternalLink size={16} className="mr-2" />
                  <a
                    href={selectedPartner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {selectedPartner.url}
                  </a>
                </div>
                <Badge
                  variant={
                    selectedPartner.status === "active"
                      ? "success"
                      : "secondary"
                  }
                >
                  {selectedPartner.status === "active" ? "Actif" : "Inactif"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Taux de commission
                </h4>
                <div className="flex items-center text-green-600">
                  <TrendingUp size={20} className="mr-2" />
                  <span className="text-2xl font-bold">
                    {selectedPartner.commissionRate}%
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Partenaire depuis
                </h4>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(selectedPartner.createdAt).toLocaleDateString(
                    "fr-FR",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                Statistiques
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">
                    Produits référencés
                  </span>
                  <span className="text-sm font-medium">1,234</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">
                    Commissions générées
                  </span>
                  <span className="text-sm font-medium">2,456€</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">
                    Dernière synchronisation
                  </span>
                  <span className="text-sm font-medium">Il y a 2 heures</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PartnersPage;
