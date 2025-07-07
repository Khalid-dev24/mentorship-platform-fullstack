import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sessionRes = await API.get("/admin/sessions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const feedbackRes = await API.get("/admin/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(userRes.data);
        setSessions(sessionRes.data);
        setFeedbacks(feedbackRes.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load admin data. Are you logged in as admin?");
        if (err.response?.status === 403 || err.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Admin Dashboard</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white shadow p-4 rounded-lg border">
          <h2 className="font-semibold text-lg mb-2 text-gray-800">Users ({users.length})</h2>
          {users.map((u: any) => (
            <div key={u._id} className="border-b py-1 text-sm text-gray-700">
              {u.name} ({u.role})
            </div>
          ))}
        </div>

        {/* Sessions */}
        <div className="bg-white shadow p-4 rounded-lg border">
          <h2 className="font-semibold text-lg mb-2 text-gray-800">Sessions ({sessions.length})</h2>
          {sessions.map((s: any) => (
            <div key={s._id} className="border-b py-1 text-sm text-gray-700">
              {new Date(s.date).toLocaleDateString()} — {s.mentor?.name} ⇄ {s.mentee?.name}
            </div>
          ))}
        </div>

        {/* Feedback */}
        <div className="bg-white shadow p-4 rounded-lg border">
          <h2 className="font-semibold text-lg mb-2 text-gray-800">Feedbacks ({feedbacks.length})</h2>
          {feedbacks.map((f: any) => (
            <div key={f._id} className="border-b py-1 text-sm text-gray-700">
              ⭐ {f.rating} — {f.comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
