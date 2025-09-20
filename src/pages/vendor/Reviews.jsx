import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../context/AuthContext"; // 👈 vendor auth
import { getVendorReviews } from "../../api"; // 🔗 backend call

function Reviews() {
  const { user } = useAuth(); // { id, name, role: "vendor", ... }
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchReviews = async () => {
      try {
        const data = await getVendorReviews(user.id);
        setReviews(data);
      } catch (err) {
        console.error("❌ Failed to load vendor reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  // Render star rating
  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < count ? "text-yellow-500" : "text-gray-300"}`}
      >
        ★
      </span>
    ));

  return (
    <PageWrapper>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-brand-orange text-center">
          Customer Reviews
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-600">
            No reviews yet for your products.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white shadow-md rounded-2xl p-6 flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {review.productName || "Product"}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Customer:</span>{" "}
                  {review.customerName || "Anonymous"}
                </p>

                <div className="flex items-center mb-2">
                  {renderStars(review.rating || 0)}
                </div>

                <p className="text-gray-600 italic mb-3">"{review.comment}"</p>

                <p className="text-sm text-gray-500">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default Reviews;
