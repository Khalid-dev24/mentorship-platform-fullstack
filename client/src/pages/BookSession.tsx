import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const BookSession = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post(
        "/sessions",
        { mentorId, date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Session booked successfully!");
      setTimeout(() => navigate("/sessions"), 1500);
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Failed to book session");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Book a Session</h2>

      {message && (
        <p
          className={`mb-4 text-center text-sm ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Select Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          Book Session
        </button>
      </form>
    </div>
  );
};

export default BookSession;
