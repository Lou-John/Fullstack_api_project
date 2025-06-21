const API_BASE_URL = "http://localhost:2070/api";

// Get token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

// Generic API request function with authentication
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      throw new Error("Authentication failed");
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  console.log(`[${endpoint}] >`, json);

  return json?.data ?? json;
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return response.json();
  },
};

// Components API
export const componentsAPI = {
  getAll: () => apiRequest<any[]>("/composants"),
  getById: (id: string) => apiRequest<any>(`/composants/${id}`),
  create: (data: any) =>
    apiRequest<any>("/composants", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest<any>(`/composants/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/composants/${id}`, {
      method: "DELETE",
    }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => apiRequest<any[]>("/categories"),
  getById: (id: string) => apiRequest<any>(`/categories/${id}`),
  create: (data: any) =>
    apiRequest<any>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest<any>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/categories/${id}`, {
      method: "DELETE",
    }),
};

// Users API
export const usersAPI = {
  getAll: () => apiRequest<any[]>("/user"),
  getById: (id: string) => apiRequest<any>(`/user/${id}`),
  update: (id: string, data: any) =>
    apiRequest<any>(`/user/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/user/${id}`, {
      method: "DELETE",
    }),
};

// Configurations API
export const configurationsAPI = {
  getAll: () => apiRequest<any[]>("/configurations"),
  getById: (id: string) => apiRequest<any>(`/configurations/${id}`),
  create: (data: any) =>
    apiRequest<any>("/configurations", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest<any>(`/configurations/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/configurations/${id}`, {
      method: "DELETE",
    }),
};

// Partners API
export const partnersAPI = {
  getAll: () => apiRequest<any[]>("/partenaires"),
  getById: (id: string) => apiRequest<any>(`/partenaires/${id}`),
  create: (data: any) =>
    apiRequest<any>("/partenaires", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest<any>(`/partenaires/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/partenaires/${id}`, {
      method: "DELETE",
    }),
};

// Partner Prices API
export const partnerPricesAPI = {
  getByComponent: (componentId: string) =>
    apiRequest<any[]>(`/components/${componentId}/prices`),
  update: (id: string, data: any) =>
    apiRequest<any>(`/partner-prices/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// Dashboard/Stats API
export const statsAPI = {
  getDashboard: () => apiRequest<any>("/stats/dashboard"),
};
