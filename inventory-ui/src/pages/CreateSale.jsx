import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateSale() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products");
    }
  };

  const selectedProduct = products.find(
    (p) => p.id === Number(selectedProductId)
  );

  const handleSale = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedProductId) {
      setMessage("Please select a product.");
      return;
    }

    if (quantity <= 0) {
      setMessage("Quantity must be greater than 0.");
      return;
    }

    if (selectedProduct && quantity > selectedProduct.quantity) {
      setMessage("Insufficient stock available.");
      return;
    }

    try {
      await api.post(
        `/products/${selectedProductId}/sale?quantity=${quantity}`
      );

      setMessage("Sale created successfully!");
      setQuantity("");
      fetchProducts(); // refresh stock

    } catch (err) {
      console.error(err);
      setMessage("Failed to create sale.");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg">
        <h2 className="text-2xl font-bold mb-6">
          Create Sale
        </h2>

        {message && (
          <div className="mb-4 text-sm text-red-600 font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSale} className="space-y-4">

          {/* Product Dropdown */}
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (Stock: {product.quantity})
              </option>
            ))}
          </select>

          {/* Quantity */}
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border rounded-lg px-4 py-2"
          />

          {/* Stock Info */}
          {selectedProduct && (
            <div className="text-sm text-gray-600">
              Available Stock:{" "}
              <span className="font-semibold">
                {selectedProduct.quantity}
              </span>
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full transition"
          >
            Create Sale
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateSale;