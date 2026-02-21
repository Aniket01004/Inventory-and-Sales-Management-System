import { useEffect, useState } from "react";
import api from "../api/axios";

function DailyReport() {
  const [totalSales, setTotalSales] = useState(0);
  const [todaySales, setTodaySales] = useState([]);

  useEffect(() => {
    fetchDailyData();
  }, []);

  const fetchDailyData = async () => {
    try {
      const res = await api.get("/sales"); // reuse sales endpoint

      const today = new Date().toISOString().split("T")[0];

      const filtered = res.data.filter((sale) =>
        sale.saleDate.startsWith(today)
      );

      const total = filtered.reduce(
        (sum, sale) => sum + sale.totalPrice,
        0
      );

      setTodaySales(filtered);
      setTotalSales(total);

    } catch (err) {
      console.error("Error fetching daily sales", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 space-y-6">

      {/* Revenue Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          Daily Revenue
        </h2>
        <p className="text-3xl font-bold text-green-600">
          ₹{totalSales.toLocaleString()}
        </p>
        <p className="text-gray-500 mt-2">
          {todaySales.length} Transactions Today
        </p>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Today’s Sales Details
        </h3>

        {todaySales.length === 0 ? (
          <p className="text-gray-500">No sales recorded today.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm uppercase tracking-wide">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Qty</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {todaySales.map((sale, index) => (
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
                  <td className="py-3 px-4 font-semibold text-green-600">
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

export default DailyReport;