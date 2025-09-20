import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { fetchProductById } from "../../api"; // we'll add this API helper

function ProductDetail() {
  const { id } = useParams(); // product id from URL
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Image */}
        <img
          src={(product.imageUrl && product.imageUrl.length > 0) 
            ? product.imageUrl[0] 
            : "https://via.placeholder.com/400x400.png?text=No+Image"}
          alt={product.name}
          className="w-full h-96 object-cover rounded-2xl shadow"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>

          <p className="text-2xl font-bold text-brand-orange mb-4">
            ₦{product.price.toLocaleString()}
          </p>

          {product.category && (
            <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
          )}

          {product.vendorId && (
          <div className="text-sm text-gray-500 mb-6">
            <p><strong>Seller:</strong> {product.vendorId.businessName || product.vendorId.name}</p>
            <p><strong>Phone:</strong> {product.vendorId.phone || "N/A"}</p>
            </div>
          )}

          

          <button
            onClick={() => addToCart(product)}
            className="bg-brand-orange text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
