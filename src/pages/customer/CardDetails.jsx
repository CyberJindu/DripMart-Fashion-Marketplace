import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CardDetails() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // For demo: skip real validation
    if (cardNumber && expiry && cvv) {
      navigate("/customer/Payment"); // go to payment simulation
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-brand-orange text-center">
        Enter Card Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-brand-orange text-white py-3 rounded-xl hover:bg-orange-600 transition"
        >
          Proceed to Pay
        </button>
      </form>
    </div>
  );
}

export default CardDetails;
