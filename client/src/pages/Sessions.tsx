import { useEffect, useState } from "react";
import API from "../api/axios";

const Sessions = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get("/sessions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSessions(res.data);
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      }
    };

    fetchSessions();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">My Scheduled Sessions</h2>

      {sessions.length === 0 ? (
        <p className="text-center text-gray-600">No sessions booked yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((s) => (
            <div
              key={s._id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {formatDate(s.date)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Time:</strong> {s.time}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>With:</strong>{" "}
                {s.mentor?.name || s.mentee?.name}{" "}
                <span className="text-xs text-gray-400">
                  ({s.mentor ? "Mentor" : "Mentee"})
                </span>
              </p>
              <p
                className={`inline-block mt-2 px-3 py-1 rounded text-sm font-medium ${getStatusColor(
                  s.status
                )}`}
              >
                {s.status.toUpperCase()}
              </p>

              {!s.feedbackGiven && (
                <a
                  href={`/feedback/${s._id}`}
                  className="block mt-4 text-blue-600 underline text-sm hover:text-blue-800"
                >
                  Leave Feedback
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sessions;
