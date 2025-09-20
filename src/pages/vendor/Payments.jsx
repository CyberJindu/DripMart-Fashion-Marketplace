import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { fetchVendorOrders } from "../../api";
import { useAuth } from "../../context/AuthContext";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // ✅ Get logged-in vendor from AuthContext

  useEffect(() => {
    if (!user?._id) return; // no vendor logged in yet

    fetchVendorOrders(user._id)
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch payments:", err);
        setLoading(false);
      });
  }, [user]);

  return (
    <PageWrapper>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-brand-orange text-center">
          Payments Received
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading payments...</p>
        ) : payments.length === 0 ? (
          <p className="text-center text-gray-600">No payments yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Order #{payment._id.slice(-5)}
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Customer:</span>{" "}
                    {typeof payment.customerId === "object" 
                    ? payment.customerId.name || payment.customerId.email || payment.customerId._id
                    : payment.customerId}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Amount:</span> ₦
                    {payment.total?.toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Payment Status:</span>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        payment.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {payment.paymentStatus || "Confirmed"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default Payments;
