// src/pages/vendor/Profile.jsx
import { useEffect, useState } from "react";
import { saveVendorProfile, getVendorProfile } from "../../api";
import { useAuth } from "../../context/AuthContext";
import PageWrapper from "../../components/PageWrapper";

function Profile() {
  const { user } = useAuth(); // get vendor info (id, email, role, etc.)

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    location: "",
    category: "",
    bankName: "",
    accountNumber: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load profile on mount / when user becomes available
  useEffect(() => {
    async function loadProfile() {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getVendorProfile(user._id);

        // Backend might return:
        // - vendorProfile object directly
        // - or an object like { user: { vendorProfile: { ... } } }
        // - or an updated user directly (depending on your backend)
        let profile = {};
        if (!data) profile = {};
        else if (data.vendorProfile) profile = data.vendorProfile;
        else if (data.user && data.user.vendorProfile) profile = data.user.vendorProfile;
        else profile = data;

        setFormData((prev) => ({ ...prev, ...profile }));
      } catch (err) {
        console.error("❌ Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!/^\d{10,}$/.test(formData.accountNumber)) {
      alert("Account number must be at least 10 digits.");
      return false;
    }
    if (!/^\+?\d{7,15}$/.test(formData.phone)) {
      alert("Enter a valid phone number.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!user || !user._id) {
      alert("❌ No vendor logged in.");
      return;
    }

    setSaving(true);
    try {
      const res = await saveVendorProfile(user._id, formData);

      // Backend might return updated user or vendorProfile; normalize:
      let savedProfile = {};
      if (!res) savedProfile = {};
      else if (res.vendorProfile) savedProfile = res.vendorProfile;
      else if (res.user && res.user.vendorProfile) savedProfile = res.user.vendorProfile;
      else savedProfile = res;

      setFormData((prev) => ({ ...prev, ...savedProfile }));

      console.log("✅ Profile saved:", res);
      alert("✅ Profile saved successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save profile. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex justify-center p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-brand-orange">
            Vendor Profile Setup
          </h2>

          {loading ? (
            <p className="text-center text-gray-600">Loading profile...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Business Name */}
              <div>
                <label className="block mb-1 font-medium">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange"
                  placeholder="e.g. Trendy Fashion Hub"
                  required
                />
              </div>

              {/* Owner Name */}
              <div>
                <label className="block mb-1 font-medium">Owner/Contact Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange"
                  placeholder="e.g. Jane Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange"
                  placeholder="vendor@email.com"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange"
                  placeholder="+234 812 345 6789"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block mb-1 font-medium">Business Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange"
                  placeholder="Lagos, Nigeria"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-1 font-medium">Business Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="clothing">Clothing</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                  <option value="bags">Bags</option>
                </select>
              </div>

              {/* Bank Name */}
              <div>
                <label className="block mb-1 font-medium">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange"
                  placeholder="e.g. Zenith Bank"
                  required
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block mb-1 font-medium">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange"
                  placeholder="1234567890"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 font-medium">Business Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange"
                  placeholder="Tell customers about your business..."
                  rows="4"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-brand-orange text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Profile;
