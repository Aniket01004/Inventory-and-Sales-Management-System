import { useState } from "react";
import api from "../api/axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/products/with-image", formData);

      setMessage("Product added successfully");
      setName("");
      setPrice("");
      setQuantity("");
      setImage(null);

    } catch (error) {
      setMessage("Failed to add product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-6">
        Add Product
      </h2>

      {message && (
        <p className="mb-4 text-sm text-red-500">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            required
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Product Image
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
