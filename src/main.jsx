import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import Expenses from './pages/Expenses';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<App/>}>
          <Route index element={<Navigate to="/dashboard" replace/>} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="invoices" element={<Invoices/>} />
          <Route path="expenses" element={<Expenses/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
