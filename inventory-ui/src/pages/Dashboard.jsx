import React, { useEffect, useState } from "react";
import api from "../api/axios";   // ✅ use centralized axios
import { useNavigate } from "react-router-dom";
function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [lowStock, setLowStock] = useState([]);
const navigate = useNavigate(); 
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {

      // ✅ No manual headers
      const summaryRes = await api.get("/dashboard/summary");

      const lowStockRes = await api.get(
        "/products/low-stock?threshold=5"
      );

      setSummary(summaryRes.data);
      setLowStock(lowStockRes.data);

    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  if (!summary) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-5">
          <h3 className="text-gray-500">Low Stock Count</h3>
          <p className="text-2xl font-bold">{summary.lowStockCount}</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h3 className="text-gray-500">Today's Sales</h3>
          <p className="text-2xl font-bold">₹ {summary.todaySales}</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h3 className="text-gray-500">Monthly Sales</h3>
          <p className="text-2xl font-bold">₹ {summary.monthlySales}</p>
        </div>
      </div>

      {/* Low Stock Table */}
      {/* Low Stock Preview */}
<div className="bg-white rounded-xl shadow-lg p-6">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold text-red-600">
      ⚠ Low Stock Alert
    </h3>

    <button
      onClick={() => navigate("/products/low-stock")}
      className="text-sm text-blue-600 hover:underline"
    >
      View All →
    </button>
  </div>

  {lowStock.length === 0 ? (
    <p className="text-gray-500">All products are sufficiently stocked.</p>
  ) : (
    <div className="space-y-3">
      {lowStock.slice(0, 3).map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg"
        >
          <span className="font-medium">
            {product.name}
          </span>

          <span
            className={`text-sm font-semibold ${
              product.quantity === 0
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {product.quantity === 0
              ? "Out of Stock"
              : `Only ${product.quantity} left`}
          </span>
        </div>
      ))}
    </div>
  )}
    </div>
    </div>
  );
}

export default Dashboard;