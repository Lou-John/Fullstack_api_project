import { Component, ComponentCategory, Partner, User, Configuration, PartnerPrice } from '../types';

export const categories: ComponentCategory[] = [
  { id: '1', name: 'Processeur', slug: 'cpu', description: 'Processeurs Intel et AMD' },
  { id: '2', name: 'Carte Graphique', slug: 'gpu', description: 'Cartes graphiques NVIDIA et AMD' },
  { id: '3', name: 'Mémoire RAM', slug: 'ram', description: 'Mémoire vive DDR4 et DDR5' },
  { id: '4', name: 'Stockage', slug: 'storage', description: 'SSD et HDD' },
  { id: '5', name: 'Carte Mère', slug: 'motherboard', description: 'Cartes mères compatibles' },
  { id: '6', name: 'Alimentation', slug: 'psu', description: 'Alimentations modulaires et non-modulaires' },
  { id: '7', name: 'Boîtier', slug: 'case', description: 'Boîtiers ATX, mATX et ITX' },
];

export const components: Component[] = [
  {
    id: '1',
    title: 'Intel Core i7-13700K',
    category: categories[0],
    brand: 'Intel',
    model: 'i7-13700K',
    description: 'Processeur 16 cœurs haute performance',
    specifications: {
      'Cœurs': '16 (8P + 8E)',
      'Threads': '24',
      'Fréquence de base': '3.4 GHz',
      'Fréquence boost': '5.4 GHz',
      'Socket': 'LGA1700',
      'TDP': '125W'
    },
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400',
    basePrice: 419,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'NVIDIA GeForce RTX 4070',
    category: categories[1],
    brand: 'NVIDIA',
    model: 'RTX 4070',
    description: 'Carte graphique haut de gamme avec ray tracing',
    specifications: {
      'Mémoire': '12 GB GDDR6X',
      'Interface': 'PCIe 4.0',
      'Ports': '3x DisplayPort, 1x HDMI',
      'TDP': '200W',
      'Fréquence boost': '2475 MHz'
    },
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400',
    basePrice: 629,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    title: 'Corsair Vengeance LPX 32GB',
    category: categories[2],
    brand: 'Corsair',
    model: 'CMK32GX4M2D3600C18',
    description: 'Kit mémoire DDR4 haute performance',
    specifications: {
      'Capacité': '32 GB (2x16GB)',
      'Type': 'DDR4',
      'Fréquence': '3600 MHz',
      'Latence': 'CL18',
      'Voltage': '1.35V'
    },
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400',
    basePrice: 189,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

export const partners: Partner[] = [
  {
    id: '1',
    name: 'TopAchat',
    url: 'https://topachat.com',
    logo: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=100',
    commissionRate: 3.5,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'LDLC',
    url: 'https://ldlc.com',
    logo: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=100',
    commissionRate: 4.0,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Materiel.net',
    url: 'https://materiel.net',
    logo: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=100',
    commissionRate: 3.8,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    role: 'user',
    createdAt: '2024-01-10T08:00:00Z',
    configurationsCount: 3
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@email.com',
    role: 'user',
    createdAt: '2024-01-12T14:30:00Z',
    configurationsCount: 1
  },
  {
    id: '3',
    name: 'Pierre Durand',
    email: 'pierre.durand@email.com',
    role: 'user',
    createdAt: '2024-01-15T09:15:00Z',
    configurationsCount: 5
  }
];

export const configurations: Configuration[] = [
  {
    id: '1',
    name: 'Gaming PC High-End',
    userId: '1',
    components: [
      {
        id: '1',
        componentId: '1',
        component: components[0],
        selectedPartnerId: '1',
        selectedPartner: partners[0],
        price: 419
      },
      {
        id: '2',
        componentId: '2',
        component: components[1],
        selectedPartnerId: '2',
        selectedPartner: partners[1],
        price: 629
      }
    ],
    totalPrice: 1048,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  }
];

export const partnerPrices: PartnerPrice[] = [
  {
    id: '1',
    partnerId: '1',
    componentId: '1',
    price: 419,
    inStock: true,
    lastUpdated: '2024-01-16T12:00:00Z'
  },
  {
    id: '2',
    partnerId: '2',
    componentId: '1',
    price: 425,
    inStock: true,
    lastUpdated: '2024-01-16T12:00:00Z'
  }
];