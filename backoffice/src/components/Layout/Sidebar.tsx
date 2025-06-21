import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Cpu,
  Users,
  Settings,
  Store,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  onLogout,
}) => {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Tableau de bord" },
    { to: "/components", icon: Cpu, label: "Composants" },
    { to: "/users", icon: Users, label: "Utilisateurs" },
    { to: "/configurations", icon: Settings, label: "Configurations" },
    { to: "/partners", icon: Store, label: "Partenaires" },
  ];

  return (
    <div
      className={`bg-slate-900 text-white transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-blue-400">ConfigurateurPC</h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <item.icon size={20} />
                {!isCollapsed && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors w-full"
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
