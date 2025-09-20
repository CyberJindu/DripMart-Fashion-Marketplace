// src/pages/vendor/Orders.jsx
import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { fetchVendorOrders, updateOrderStatus } from "../../api";
import { useAuth } from "../../context/AuthContext"; // ✅ bring in vendor info

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // 👈 logged-in vendor
  const vendorId = user?._id; // 👈 must be a real ObjectId

  // Fetch vendor orders
  useEffect(() => {
    if (!vendorId) return;

    async function loadOrders() {
      try {
        const data = await fetchVendorOrders(vendorId);
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        alert("❌ Could not load orders.");
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [vendorId]);

  // Update order status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(id, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, orderStatus: updatedOrder.orderStatus } : order
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
      alert("❌ Failed to update order status.");
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <p className="text-center p-6">Loading orders...</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-brand-orange text-center">
          Orders Received
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Order #{order._id.slice(-5)}
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Customer:</span>{" "}
                    {order.customerId?.name || order.customerId?.email || "Demo User"}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Items:</span>
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-3">
                    {order.items?.map((item, i) => (
                      <li key={i}>
                        {item.productId?.name || "Unnamed Product"} ×{" "}
                        {item.quantity || 1}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-700">
                    <span className="font-medium">Total:</span> ₦
                    {order.total?.toLocaleString()}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Payment:</span>{" "}
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      {order.paymentStatus || "Confirmed"}
                    </span>
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.orderStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </p>
                </div>

                {/* Status update buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(order._id, "Shipped")}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Mark Shipped
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(order._id, "Delivered")}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Mark Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default Orders;
