import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route,Routes, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import Login from './components/Login/Login';
import Admin from './pages/admin/Admin';

function App() {
  const {isAuthenticated} = useAuth();

  return (
    <div>
      <Routes>
      <Route
          path="login"
          element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/" /> : <Admin />}
        />
      </Routes>
    </div>
  );
}

export default App;
