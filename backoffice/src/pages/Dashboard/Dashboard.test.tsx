import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./Dashboard";
import * as api from "../../services/api";

// Dashboard.test.tsx

// Mock Card component
jest.mock(
  "../../components/UI/Card",
  () => (props: React.PropsWithChildren<any>) =>
    (
      <div data-testid="card" {...props}>
        {props.children}
      </div>
    )
);

// Mock API modules
jest.mock("../../services/api");

const mockComponents = [
  { id: 1, titre: "CPU Ryzen", categorie: "CPU", prix: 300, image: "img1" },
  { id: 2, titre: "GPU RTX", categorie: "GPU", prix: 700, image: "img2" },
];
const mockUsers = [
  { id: 1, username: "alice" },
  { id: 2, username: "bob" },
];
const mockConfigurations = [
  { id: 1, user: 1, composants: [1, 2], total: 1000, date: "2024-06-01" },
  { id: 2, user: 2, composants: [2], total: 700, date: "2024-06-02" },
];
const mockPartners = [
  { id: 1, name: "PartnerA", url: "http://a.com" },
  { id: 2, name: "PartnerB", url: "http://b.com" },
];

describe("Dashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.componentsAPI.getAll as jest.Mock).mockResolvedValue(mockComponents);
    (api.usersAPI.getAll as jest.Mock).mockResolvedValue(mockUsers);
    (api.configurationsAPI.getAll as jest.Mock).mockResolvedValue(
      mockConfigurations
    );
    (api.partnersAPI.getAll as jest.Mock).mockResolvedValue(mockPartners);
  });

  it("affiche les statistiques et les listes après chargement", async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText("Tableau de bord")).toBeInTheDocument();
    });
    expect(screen.getByText("Composants")).toBeInTheDocument();
    expect(screen.getByText("Utilisateurs")).toBeInTheDocument();
    expect(screen.getByText("Configurations")).toBeInTheDocument();
    expect(screen.getByText("Partenaires")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument(); // composants
    expect(screen.getByText("2")).toBeInTheDocument(); // utilisateurs
    expect(screen.getByText("2")).toBeInTheDocument(); // configurations
    expect(screen.getByText("2")).toBeInTheDocument(); // partenaires

    expect(screen.getByText("Configurations récentes")).toBeInTheDocument();
    expect(screen.getByText("alice")).toBeInTheDocument();
    expect(screen.getByText("bob")).toBeInTheDocument();

    expect(screen.getByText("Nouveaux partenaires")).toBeInTheDocument();
    expect(screen.getByText("PartnerA")).toBeInTheDocument();
    expect(screen.getByText("PartnerB")).toBeInTheDocument();

    expect(screen.getByText("Composants populaires")).toBeInTheDocument();
    expect(screen.getByText("CPU Ryzen")).toBeInTheDocument();
    expect(screen.getByText("GPU RTX")).toBeInTheDocument();
  });

  it("affiche 'Aucune donnée' si les listes sont vides", async () => {
    api.componentsAPI.getAll.mockResolvedValue([]);
    api.usersAPI.getAll.mockResolvedValue([]);
    api.configurationsAPI.getAll.mockResolvedValue([]);
    api.partnersAPI.getAll.mockResolvedValue([]);
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText("Tableau de bord")).toBeInTheDocument();
    });
    expect(screen.getAllByText("Aucune donnée").length).toBeGreaterThan(0);
  });

  it("gère les erreurs d’API", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    api.componentsAPI.getAll.mockRejectedValue(new Error("API Error"));
    render(<Dashboard />);
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });
    errorSpy.mockRestore();
  });
});
