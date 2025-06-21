export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  configurationsCount: number;
}

export interface Component {
  id: string;
  title: string;
  category: ComponentCategory;
  brand: string;
  model: string;
  description: string;
  specifications: Record<string, string>;
  image: string;
  basePrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface ComponentCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Partner {
  id: string;
  name: string;
  url: string;
  logo: string;
  commissionRate: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface PartnerPrice {
  id: string;
  partnerId: string;
  componentId: string;
  price: number;
  inStock: boolean;
  lastUpdated: string;
}

export interface Configuration {
  id: string;
  name: string;
  userId: string;
  components: ConfigurationComponent[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConfigurationComponent {
  id: string;
  componentId: string;
  component: Component;
  selectedPartnerId: string;
  selectedPartner: Partner;
  price: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  token: string;
}