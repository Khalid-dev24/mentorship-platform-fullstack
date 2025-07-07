import { useEffect, useState } from "react";
import API from "../api/axios";

const ReceivedRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReceived = async () => {
      try {
        const res = await API.get("/requests/received", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch received requests");
      }
    };

    fetchReceived();
  }, []);

  const handleUpdate = async (requestId: string, status: "ACCEPTED" | "REJECTED") => {
    try {
      await API.put(
        `/requests/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests((prev) =>
        prev.map((r) => (r._id === requestId ? { ...r, status } : r))
      );
    } catch (err: any) {
      alert("Failed to update request");
      console.error(err.response?.data || err.message);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800"; 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Mentorship Requests You've Received
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No requests received yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Mentee: {req.mentee?.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Requested On: {new Date(req.createdAt).toLocaleString()}
              </p>

              <p
                className={`inline-block mt-2 px-3 py-1 rounded text-sm font-medium ${getStatusClass(
                  req.status
                )}`}
              >
                {req.status}
              </p>

              {req.status === "PENDING" && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleUpdate(req._id, "ACCEPTED")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdate(req._id, "REJECTED")}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceivedRequests;
