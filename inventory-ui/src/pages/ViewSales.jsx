import { useEffect, useState } from "react";
import api from "../api/axios";

function ViewSales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/api/sales");
      // Sort newest first
      const sorted = res.data.sort(
        (a, b) => new Date(b.saleDate) - new Date(a.saleDate)
      );
      setSales(sorted);
    } catch (err) {
      console.error("Error loading sales", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          Sales List
        </h2>

        {sales.length === 0 ? (
          <p className="text-gray-500">No sales recorded.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((sale, index) => (
                  <tr
                    key={sale.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium">
                      {index + 1}
                    </td>

                    <td className="py-3 px-4 font-semibold">
                      {sale.product.name}
                    </td>

                    <td className="py-3 px-4">
                      {Math.abs(sale.quantity)}
                    </td>

                    <td className={`py-3 px-4 font-semibold ${
                      sale.totalPrice > 100000
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}>
                      ₹{sale.totalPrice.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      {formatDate(sale.saleDate)}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewSales;