import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    navigate("/products/update", { state: product });
  };

  // 🔎 Filtered Products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      {/* 🔎 Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 && (
  <p className="text-gray-500 mt-6">No products found.</p>
)}
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md transition transform hover:-translate-y-2 hover:shadow-2xl duration-300 p-4 flex flex-col"
          >
            {/* Image */}
            <div className="h-40 mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
              {product.imageUrl ? (
                <img
                  src={`http://localhost:8080/uploads/${product.imageUrl}`}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {/* Info */}
            <h3 className="text-lg font-semibold mb-1">
              {product.name}
            </h3>

            <p className="text-gray-600 text-sm mb-1">
              Price: ₹{product.price}
            </p>

            <p className={`text-sm mb-3 ${
              product.quantity === 0
                ? "text-red-600 font-semibold"
                : product.quantity < 5
                ? "text-yellow-600 font-semibold"
                : "text-green-600"
            }`}>
              Quantity: {product.quantity}
            </p>

            {/* Buttons */}
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm w-full transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm w-full transition"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;