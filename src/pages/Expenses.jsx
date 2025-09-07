import React, { useEffect, useState } from "react";
import API from "../api";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", amount: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/expenses").then((res) => setExpenses(res.data));
  }, []);

  // ✅ Create Expense
  const create = async (e) => {
    e.preventDefault();
    const res = await API.post("/expenses", form);
    setExpenses([...expenses, res.data]);
    setForm({ title: "", category: "", amount: "" });
  };

  // ✅ Delete Expense
  const deleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await API.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((e) => e._id !== id));
    }
  };

  // ✅ Filtered Data
  const filteredExpenses = expenses.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.amount.toString().includes(search)
  );

  return (
    <div className="space-y-8 bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-100 rounded-2xl p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Expenses</h2>

       {/* Search Input */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="🔍 Search expenses..."
          className="border px-4 py-2 rounded-xl w-full sm:w-72 shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      {/* Form */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border p-4 sm:p-6">
        <form
          onSubmit={create}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="border px-4 py-2 sm:py-3 rounded-xl focus:ring focus:ring-indigo-300 text-sm sm:text-base"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="border px-4 py-2 sm:py-3 rounded-xl focus:ring focus:ring-indigo-300 text-sm sm:text-base"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border px-4 py-2 sm:py-3 rounded-xl focus:ring focus:ring-indigo-300 text-sm sm:text-base"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <div className="sm:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 sm:py-3 rounded-xl w-full sm:w-auto text-sm sm:text-base"
            >
              ➕ Add Expense
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border p-4 sm:p-6 overflow-x-auto">
        <table className="w-full text-left text-sm md:text-base">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-700">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((e) => (
              <tr key={e._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{e.title}</td>
                <td className="py-3 px-4">{e.category}</td>
                <td className="py-3 px-4 font-semibold">₹{e.amount}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => deleteExpense(e._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card Layout */}
      <div className="md:hidden space-y-6">
        {filteredExpenses.map((e) => (
          <div
            key={e._id}
            className="bg-white/95 shadow-lg rounded-2xl p-5 border"
          >
            <h3 className="font-bold text-lg text-gray-900">{e.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Category:</span> {e.category}
            </p>
            <p className="text-sm text-gray-800 mb-3">
              <span className="font-medium">Amount:</span> ₹{e.amount}
            </p>
            <button
              onClick={() => deleteExpense(e._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
