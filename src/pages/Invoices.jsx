import React, { useEffect, useState } from "react";
import API from "../api";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({
    invoiceNumber: "",
    vendor: "",
    amount: "",
    dueDate: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/invoices").then((res) => setInvoices(res.data));
  }, []);

  const create = async (e) => {
    e.preventDefault();
    const res = await API.post("/invoices", { ...form, status: "pending" });
    setInvoices([...invoices, res.data]);
    setForm({ invoiceNumber: "", vendor: "", amount: "", dueDate: "" });
  };

  const updateStatus = async (id, newStatus) => {
    const res = await API.put(`/invoices/${id}`, { status: newStatus });
    setInvoices(invoices.map((i) => (i._id === id ? res.data : i)));
  };

  const deleteInvoice = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      await API.delete(`/invoices/${id}`);
      setInvoices(invoices.filter((i) => i._id !== id));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700 border border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "successful":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const filteredInvoices = invoices.filter(
    (i) =>
      i.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      i.vendor.toLowerCase().includes(search.toLowerCase()) ||
      i.amount.toString().includes(search)
  );

  return (
    <div className="space-y-8 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-100 rounded-2xl p-4 sm:p-6">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Invoices
        </h2>
        <input
          type="text"
          placeholder="🔍 Search invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 border px-4 py-2 rounded-xl text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Form */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border p-4 sm:p-6">
        <form
          onSubmit={create}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="Invoice Number"
            className="border px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base"
            value={form.invoiceNumber}
            onChange={(e) =>
              setForm({ ...form, invoiceNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Vendor"
            className="border px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base"
            value={form.vendor}
            onChange={(e) => setForm({ ...form, vendor: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            type="date"
            className="border px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
          <div className="sm:col-span-2 lg:col-span-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 sm:py-3 rounded-xl w-full sm:w-auto text-sm sm:text-base"
            >
              ➕ Add Invoice
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Table for md+ screens */}
      <div className="hidden md:block bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border p-4 sm:p-6 overflow-x-auto">
        <table className="w-full text-left text-sm md:text-base">
          <thead>
            <tr className="border-b bg-gray-50/50 text-gray-700">
              <th className="py-3 px-4">Invoice #</th>
              <th className="py-3 px-4">Vendor</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((i) => (
              <tr key={i._id} className="border-b hover:bg-gray-50/70">
                <td className="py-3 px-4 font-medium">{i.invoiceNumber}</td>
                <td className="py-3 px-4">{i.vendor}</td>
                <td className="py-3 px-4 font-semibold">₹{i.amount}</td>
                <td className="py-3 px-4">
                  {new Date(i.dueDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                      i.status
                    )}`}
                  >
                    {i.status.charAt(0).toUpperCase() + i.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <select
                    className="border rounded-lg px-2 py-1 text-sm"
                    value={i.status}
                    onChange={(e) => updateStatus(i._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="successful">Successful</option>
                  </select>
                  <button
                    onClick={() => deleteInvoice(i._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card Layout */}
      <div className="md:hidden space-y-6">
        {filteredInvoices.map((i) => (
          <div
            key={i._id}
            className="bg-white/95 shadow-xl rounded-2xl p-5 border w-full max-w-lg mx-auto"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-gray-900">
                #{i.invoiceNumber}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full font-semibold ${getStatusBadge(
                  i.status
                )}`}
              >
                {i.status.charAt(0).toUpperCase() + i.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Vendor:</span> {i.vendor}
            </p>
            <p className="text-sm text-gray-800 mb-1">
              <span className="font-medium">Amount:</span> ₹{i.amount}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Due:</span>{" "}
              {new Date(i.dueDate).toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <select
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
                value={i.status}
                onChange={(e) => updateStatus(i._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="successful">Successful</option>
              </select>
              <button
                onClick={() => deleteInvoice(i._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
