import { useEffect, useState } from "react";
import api from "../api/axios";

function LowStock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchLowStock();
  }, []);

  const fetchLowStock = async () => {
    try {
      const res = await api.get("/products/low-stock?threshold=5");
      setProducts(res.data);
    } catch (err) {
      console.error("Unable to fetch low stock products", err);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-red-600">
          Low Stock Products
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No low stock products.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium">
                      {index + 1}
                    </td>

                    <td className="py-3 px-4 font-semibold">
                      {product.name}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      ₹{product.price}
                    </td>

                    <td className="py-3 px-4 font-bold text-red-600">
                      {product.quantity}
                    </td>

                    <td className="py-3 px-4">
                      {product.quantity === 0 ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Out of Stock
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Low Stock
                        </span>
                      )}
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

export default LowStock;