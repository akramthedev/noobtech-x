import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TV from "./pages/Dashboard/TV/TV";
import Reglages from "./pages/Dashboard/Reglages/Reglages";
import Services from "./pages/Dashboard/Services/Services";
import Bureaux from "./pages/Dashboard/Bureaux/Bureaux";
import GestionTicket from "./pages/Dashboard/GestionTicket/GestionTicket";
import Tickets from "./pages/Dashboard/Tickets/Tickets";
import Statistiques from "./pages/Dashboard/Statistiques/Statistiques";




function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Not logged in, redirect to login, save current location for potential redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function RedirectIfAuth({ children }) {
  const token = localStorage.getItem('token');

  if (token) {
    // Already logged in, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}



export default function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <RedirectIfAuth>
              <Home />
            </RedirectIfAuth>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />


        <Route
          path="/register"
          element={
            <RedirectIfAuth>
              <Register />
            </RedirectIfAuth>
          }
        />

        <Route
          path="/dashboard/reglages"
          element={
            <RequireAuth>
              <Reglages />
            </RequireAuth>
          }
        />
        
        <Route
          path="/dashboard/TV"
          element={
            <RequireAuth>
              <TV />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard/services"
          element={
            <RequireAuth>
              <Services />
            </RequireAuth>
          }
        />


        <Route
          path="/dashboard/bureaux"
          element={
            <RequireAuth>
              <Bureaux />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard/gestion-tickets"
          element={
            <RequireAuth>
              <GestionTicket />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard/tickets"
          element={
            <RequireAuth>
              <Tickets />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard/statistiques"
          element={
            <RequireAuth>
              <Statistiques />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Navigate to="/dashboard/reglages" replace />
            </RequireAuth>
          }
        />


        <Route
          path="*"
          element={
            <RequireAuth>
              <Navigate to="/dashboard/reglages" replace />
            </RequireAuth>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}
