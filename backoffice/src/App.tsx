import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import ComponentsPage from './pages/Components/ComponentsPage';
import UsersPage from './pages/Users/UsersPage';
import ConfigurationsPage from './pages/Configurations/ConfigurationsPage';
import PartnersPage from './pages/Partners/PartnersPage';
import LoginPage from './pages/Auth/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="components" element={<ComponentsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="configurations" element={<ConfigurationsPage />} />
          <Route path="partners" element={<PartnersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;