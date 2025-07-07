import { useState, useEffect } from "react";
import API from "../api/axios";

const EditProfile = () => {
  const token = localStorage.getItem("token");

  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [goals, setGoals] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBio(res.data.bio || "");
        setGoals(res.data.goals || "");
        setSkills((res.data.skills || []).join(", "));
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.put(
        "/users/me/profile",
        {
          bio,
          skills: skills.split(",").map((s) => s.trim()),
          goals,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Edit Your Profile</h2>

        {message && (
          <p
            className={`mb-4 text-center text-sm px-4 py-2 rounded ${
              message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading profile...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Bio</label>
              <textarea
                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell us a bit about yourself..."
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. JavaScript, React, Node.js"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Goals</label>
              <textarea
                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={2}
                placeholder="What do you hope to achieve?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
            >
              Update Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
