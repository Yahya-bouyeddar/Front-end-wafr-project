import React from "react";
import { Link ,useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();

  // Ne pas afficher la Navbar sur /login
  if (location.pathname === "/login") return null;

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-white">WafR Console</div>
      { isAuthenticated && (
        <div className="space-x-4">
          <Link to="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>
          <Link to="/users" className="text-gray-300 hover:text-white">
            Users
          </Link>
          <Link to="/transactions" className="text-gray-300 hover:text-white">
            Transactions
          </Link>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
