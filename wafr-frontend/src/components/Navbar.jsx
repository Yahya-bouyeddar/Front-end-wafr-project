import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-white">WafR Console</div>
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
        <Link to="/login" className="text-gray-300 hover:text-white">
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
