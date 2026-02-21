import { useEffect, useState } from "react";
import api from "../api/axios";

function MonthlyReport() {
  const [totalSales, setTotalSales] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  const fetchMonthlyData = async () => {
    try {
      const res = await api.get("/sales");

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const filtered = res.data.filter((sale) => {
        const saleDate = new Date(sale.saleDate);
        return (
          saleDate.getMonth() === currentMonth &&
          saleDate.getFullYear() === currentYear
        );
      });

      const total = filtered.reduce(
        (sum, sale) => sum + sale.totalPrice,
        0
      );

      // sort newest first
      filtered.sort(
        (a, b) => new Date(b.saleDate) - new Date(a.saleDate)
      );

      setMonthlySales(filtered);
      setTotalSales(total);

    } catch (err) {
      console.error("Error fetching monthly sales", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">

      {/* Revenue Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          Monthly Revenue
        </h2>
        <p className="text-3xl font-bold text-blue-600">
          ₹{totalSales.toLocaleString()}
        </p>
        <p className="text-gray-500 mt-2">
          {monthlySales.length} Transactions This Month
        </p>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Monthly Sales Details
        </h3>

        {monthlySales.length === 0 ? (
          <p className="text-gray-500">No sales recorded this month.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm uppercase tracking-wide">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Qty</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {monthlySales.map((sale, index) => (
                <tr
                  key={sale.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {sale.product.name}
                  </td>
                  <td className="py-3 px-4">
                    {sale.quantity}
                  </td>
                  <td className="py-3 px-4 font-semibold text-blue-600">
                    ₹{sale.totalPrice.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {formatDate(sale.saleDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default MonthlyReport;