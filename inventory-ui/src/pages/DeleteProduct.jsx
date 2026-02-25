import { useState } from "react";
import api from "../api/axios";

function DeleteProduct() {
  const [id, setId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/api/products/${id}`);
      alert("Product deleted successfully");
    } catch (err) {
      alert("Error deleting product");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Delete Product</h2>

      <form onSubmit={handleDelete} className="space-y-3">
        <input
          type="number"
          placeholder="Product ID"
          className="w-full border p-2 rounded"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />

        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
      </form>
    </div>
  );
}

export default DeleteProduct;
