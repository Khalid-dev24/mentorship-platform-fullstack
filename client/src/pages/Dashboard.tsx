import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user && (!user.bio || !user.skills?.length || !user.goals)) {
      navigate("/create-profile");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err: any) {
        alert("Not logged in or session expired");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-blue-800">Welcome, {user?.name || "User"}</h2>
            <span className="inline-block mt-2 px-4 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700 uppercase">
              {user?.role}
            </span>
          </div>

          {user?.role === "mentor" && (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Mentor Tools</h3>
              <a
                href="/requests/received"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
              >
                View Received Requests
              </a>
            </div>
          )}

          {user?.role === "mentee" && (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Mentee Tools</h3>
              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  href="/mentors"
                  className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
                >
                  Discover Mentors
                </a>
                <a
                  href="/requests/sent"
                  className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition"
                >
                  View Sent Requests
                </a>
              </div>
            </div>
          )}

          {user?.role === "admin" && (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Admin Panel</h3>
              <a
                href="/admin/dashboard"
                className="inline-block bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition"
              >
                Manage Platform
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
