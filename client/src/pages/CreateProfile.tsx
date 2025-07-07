import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [goals, setGoals] = useState("");
  const [message, setMessage] = useState("");

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
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("✅ Profile created successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Create Your Profile</h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm text-center font-medium ${
              message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Bio</label>
            <textarea
              className="w-full border border-gray-300 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Skills (comma-separated)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. JavaScript, React, Node.js"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Goals</label>
            <textarea
              className="w-full border border-gray-300 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              rows={3}
              placeholder="What are your goals for this mentorship?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
