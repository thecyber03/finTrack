import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUserFromLocal, logout } from "../utils/auth";

export default function Navbar() {
  const user = getUserFromLocal();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow sticky top-0 z-50">
      <div className="w-auto  mx-auto px-4 sm:px-6 lg:px-8  py- flex items-center justify-">
        {/* Left - Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-whit left-1 ">
          FinTrack
        </Link>

        {/* Center - Nav Links (Desktop only) */}
        <nav className="hidden md:flex ml-8  space-x-10 font-medium text-white">
          <Link to="/dashboard" className="hover:text-yellow-300 transition">
            Dashboard
          </Link>
          <Link to="/invoices" className="hover:text-yellow-300 transition">
            Invoices
          </Link>
          <Link to="/expenses" className="hover:text-yellow-300 transition">
            Expenses
          </Link>
        </nav>

        {/* Right - User/Login (Desktop only) */}
        <div className="hidden md:flex items-center space-x-3 ml-auto">
          {user ? (
            <>
              <span className="text-gray-100 ml-8">Hello, {user.name}</span>
              <button
                onClick={logout}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-xl font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-xl font-semibold ml-8"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white ml-36 text-2xl ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Fixed Mobile Dropdown */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 shadow-lg z-50 md:hidden">
          <nav className="flex flex-col px-6 py-6 space-y-6 text-white text-lg font-medium">
            <Link
              to="/dashboard"
              className="hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/invoices"
              className="hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Invoices
            </Link>
            <Link
              to="/expenses"
              className="hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Expenses
            </Link>

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-xl font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-xl text-center font-semibold"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
