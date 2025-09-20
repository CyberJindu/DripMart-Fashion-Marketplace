import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getVendorProducts } from "../../api";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

function Products() {
  const { user } = useAuth(); // assume user = { id, role, ... }
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load vendor's products
  const loadProducts = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const vendorProducts = await getVendorProducts(user.id);
      setProducts(vendorProducts);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [user]);

  return (
    <PageWrapper>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brand-orange">My Products</h2>
          <Link
            to="/vendor/AddProduct"
            className="bg-brand-orange text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            + Add Product
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t added any products yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-2xl p-5 flex flex-col"
              >
                {product.imageUrl?.length > 0 && (
                <img 
                src={product.imageUrl[0]}
                alt={product.name}
                className="h-40 w-full object-cover rounded-lg mb-3"
                />
                )}
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-500">{product.category}</p>
                <p className="text-brand-orange font-bold mt-2">
                  ₦{product.price?.toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm">
                  Stock: {product.stock}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default Products;
