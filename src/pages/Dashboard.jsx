import React, { useEffect, useState } from "react";
import API from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    API.get("/expenses").then((res) => setExpenses(res.data));
    API.get("/invoices").then((res) => setInvoices(res.data));
  }, []);

  return (
    <div className="space-y-8 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-100 rounded-2xl p-6">
      <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80">Total Invoices</p>
          <p className="text-4xl font-bold mt-2">{invoices.length}</p>
        </div>
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80">Total Expenses</p>
          <p className="text-4xl font-bold mt-2">{expenses.length}</p>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80">Pending Invoices</p>
          <p className="text-4xl font-bold mt-2">
            {invoices.filter((i) => i.status !== "paid").length}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border h-96">
        <h3 className="text-lg font-semibold mb-4">Expenses Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expenses}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
