import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { fetchProducts } from "../../api";
import { Link } from "react-router-dom";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const categories = ["All", "Clothing", "Shoes", "Bags"];

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-brand-orange text-center">
        Discover Fashion Picks
      </h2>

      {/* Category Bar */}
      <div className="flex gap-4 justify-center mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-brand-orange text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!loading && !error && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={(product.imageUrl && product.imageUrl.length > 0) 
                  ? product.imageUrl[0] 
                  : "https://via.placeholder.com/200x200.png?text=No+Image"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-brand-orange font-bold">
                  ₦{product.price.toLocaleString()}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-brand-orange text-white py-2 rounded-xl hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/customer/product/${product._id}`}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl text-center hover:bg-gray-300 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading &&
          !error && (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
