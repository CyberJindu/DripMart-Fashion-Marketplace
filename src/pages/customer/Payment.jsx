import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Payment() {
  const [status, setStatus] = useState("processing");
  const navigate = useNavigate();
  const { checkout } = useCart();

  useEffect(() => {
    // simulate 5 sec payment
    const timer = setTimeout(() => {
      checkout(); // move cart items to orders
      setStatus("confirmed");
    }, 5000);

    return () => clearTimeout(timer);
  }, [checkout]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {status === "processing" && (
        <>
          <div className="text-2xl font-bold text-brand-orange mb-4">
            Processing Payment...
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brand-orange border-solid"></div>
        </>
      )}

      {status === "confirmed" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Payment Confirmed ✅
          </h2>
          <button
            onClick={() => navigate("/customer/orders")}
            className="bg-brand-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Check your Order History
          </button>
        </div>
      )}
    </div>
  );
}

export default Payment;
