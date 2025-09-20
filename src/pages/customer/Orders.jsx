import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchCustomerOrders } from "../../api";
import { useNavigate } from "react-router-dom";

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;

    fetchCustomerOrders(user._id)
      .then((data) => setOrders(data))
      .catch((err) => console.error("❌ Failed to load orders:", err));
  }, [user]);

  // ✅ Pass both productId and orderId
  const handleLeaveReview = (orderId, productId) => {
    navigate(`/customer/review/${productId}`, {
      state: { orderId }, // send orderId in state
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-brand-orange text-center">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">
                Order #{index + 1}
              </h3>
              <p className="text-gray-500 mb-3">
                Placed on:{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "Unknown"}
              </p>

              <ul className="mb-4 space-y-2">
                {order.items?.map((item, i) => (
                  <li key={i} className="flex justify-between text-gray-700">
                    <span>{item.productId?.name || "Product"}</span>
                    <span>Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-brand-orange">
                  ₦{order.total?.toLocaleString()}
                </span>
              </div>

              <div className="mt-3 flex gap-2">
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                  {order.paymentStatus || "Confirmed"}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                  {order.orderStatus || "Pending"}
                </span>
              </div>

              {/* ✅ Show review button if delivered */}
              {order.orderStatus === "Delivered" &&
                order.items?.map((item, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      handleLeaveReview(order._id, item.productId?._id)
                    }
                    className="mt-4 w-full bg-brand-orange text-white py-2 rounded-xl hover:bg-orange-600 transition"
                  >
                    Leave a Review for {item.productId?.name}
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
