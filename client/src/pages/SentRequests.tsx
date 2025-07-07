import { useEffect, useState } from "react";
import API from "../api/axios";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

const SentRequests = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get("/requests/sent", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch sent requests", err);
      }
    };

    fetchRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">My Sent Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t sent any requests yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req: any) => (
            <div
              key={req._id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-all duration-300 border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-2 text-gray-700">
                <FaUser className="text-blue-500" />
                <span className="font-medium">
                  Mentor: {req.mentor?.name || "Unknown"}
                </span>
              </div>

              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded ${getStatusColor(
                  req.status
                )}`}
              >
                {req.status.toUpperCase()}
              </span>

              {req.status === "accepted" && (
                <a
                    href={`/book-session/${req.mentor._id}`}
                    className="block mt-4 text-sm text-blue-600 underline hover:text-blue-800"
                >
                    Book Session
                </a>
                )}

              <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                <FaCalendarAlt />
                <span>Sent: {new Date(req.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SentRequests;
