import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { postReview } from "../../api";
import { useAuth } from "../../context/AuthContext";

function ReviewForm() {
  const { productId } = useParams(); 
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  // orderId should be passed in navigation state from Orders page
  const orderId = location.state?.orderId;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert("❌ You must be logged in to leave a review.");
      return;
    }
    if (!orderId) {
      alert("❌ Missing order ID. You must review from your Orders page.");
      return;
    }

    setLoading(true);
    try {
      await postReview(productId, {
        orderId,     // ✅ required
        rating,
        comment,
      });

      alert("✅ Review submitted!");
      navigate("/customer/orders");
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("❌ Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-brand-orange text-center">
          Leave a Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              rows="4"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-orange text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
