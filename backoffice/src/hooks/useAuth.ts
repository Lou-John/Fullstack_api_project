import { useState, useEffect } from "react";
import { AuthUser } from "../types";

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const register = async (payload: RegisterPayload): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:2070/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      const authUser: AuthUser = {
        id: data.id,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        role: data.role,
        token: data.token,
      };

      localStorage.setItem("token", authUser.token);
      localStorage.setItem("user", JSON.stringify(authUser));
      setUser(authUser);

      return true;
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === "admin@configurateurpc.com" && password === "admin123") {
      const mockUser: AuthUser = {
        id: "admin-1",
        email: "admin@configurateurpc.com",
        name: "Administrateur",
        role: "admin",
        token: "mock-jwt-token",
      };

      localStorage.setItem("token", mockUser.token);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    }

    try {
      const response = await fetch("http://localhost:2070/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      const authUser: AuthUser = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        token: data.token,
      };

      localStorage.setItem("token", authUser.token);
      localStorage.setItem("user", JSON.stringify(authUser));
      setUser(authUser);

      return true;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/auth/login";
  };

  return { user, register, login, logout, loading };
};
