import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://fashion-marketplace-backend.onrender.com";

function Profile() {
  const [profile, setProfile] = useState({ address: "", phone: "" });
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/auth/${userId}/customer-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile({
          address: res.data.address || "",
          phone: res.data.phone || "",
        });
      })
      .catch((err) => console.error("❌ Failed to load profile:", err));
  }, [userId, token]);

  const handleSave = async () => {
    try {
      await axios.put(
        `${API_BASE}/api/auth/${userId}/customer-profile`,
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated!");
    } catch (err) {
      console.error("❌ Failed to save profile:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-brand-orange text-center">
        My Profile
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <textarea
            value={profile.address}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            type="text"
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-brand-orange text-white py-3 rounded-xl hover:bg-orange-600 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Profile;
