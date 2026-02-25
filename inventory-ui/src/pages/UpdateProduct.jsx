import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        const product = res.data;

        setName(product.name);
        setPrice(product.price);
        setQuantity(product.quantity);
      } catch (err) {
        console.error(err);
        navigate("/products");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);

      if (image) {
        formData.append("image", image);
      }

      await api.put(
        `/api/products/${id}/with-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Product updated successfully");
      navigate("/products");

    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg">
        <h2 className="text-2xl font-bold mb-6">
          Update Product
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Product Name"
            required
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Price"
            required
          />

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Quantity"
            required
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition"
          >
            Update
          </button>

        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;