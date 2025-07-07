import React, { useState } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const { id } = useParams(); // URL should be /feedback/:id
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(
        "/feedback",
        { sessionId: id, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/sessions");
    } catch (err) {
      console.error(err);
      setError("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-blue-700 mb-4">Leave Feedback</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <label className="block mb-1 text-sm font-medium">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded mb-4"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <label className="block mb-1 text-sm font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          rows={4}
          placeholder="Write your feedback..."
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
