import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; // Optional: for menu icons

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchRole = async () => {
      try {
        const res = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRole(res.data.role);
      } catch (err) {
        console.log("Failed to fetch role:", err);
      }
    };

    fetchRole();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-2xl font-bold cursor-pointer hover:text-blue-200 transition"
        >
          MentorshipHub
        </h1>

        {/* Hamburger for small screens */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {role === "mentee" && (
            <>
              <button onClick={() => navigate("/mentors")} className="hover:underline">
                Mentors
              </button>
              <button onClick={() => navigate("/requests/sent")} className="hover:underline">
                My Requests
              </button>
              <button onClick={() => navigate("/requests/sessions")} className="hover:underline">
                My Sessions
              </button>
              <button onClick={() => navigate("/edit-profile")} className="hover:underline">
                Edit Profile
              </button>
            </>
          )}

          {role === "mentor" && (
            <>
              <button onClick={() => navigate("/requests/received")} className="hover:underline">
                Requests
              </button>
              <button onClick={() => navigate("/requests/sessions")} className="hover:underline">
                My Sessions
              </button>
              <button onClick={() => navigate("/edit-profile")} className="hover:underline">
                Edit Profile
              </button>
            </>
          )}

          {role === "admin" && (
            <button onClick={() => navigate("/admin/dashboard")} className="hover:underline">
              Admin Panel
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2">
          {role === "mentee" && (
            <>
              <button onClick={() => navigate("/mentors")} className="block w-full text-left px-4 py-2 hover:bg-blue-800">
                Mentors
              </button>
              <button onClick={() => navigate("/requests/sent")} className="block w-full text-left px-4 py-2 hover:bg-blue-800">
                My Requests
              </button>
              <button onClick={() => navigate("/edit-profile")} className="block w-full text-left px-4 py-2 hover:bg-blue-800">
                Edit Profile
              </button>
            </>
          )}

          {role === "mentor" && (
            <>
              <button onClick={() => navigate("/requests/received")} className="block w-full text-left px-4 py-2 hover:bg-blue-800">
                Requests
              </button>
              <button onClick={() => navigate("/edit-profile")} className="block w-full text-left px-4 py-2 hover:bg-blue-800">
                Edit Profile
              </button>
            </>
          )}

          {role === "admin" && (
            <button onClick={() => navigate("/admin/dashboard")} className="block w-full text-left px-4 py-2 hover:bg-blue-800">
              Admin Panel
            </button>
          )}

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 bg-white text-blue-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
