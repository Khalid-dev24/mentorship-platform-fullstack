import { useEffect, useState } from "react";
import API from "../api/axios";

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await API.get("/users/mentors", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMentors(res.data);
      } catch (err) {
        console.error("Failed to fetch mentors", err);
      }
    };

    fetchMentors();
  }, []);

    const sendRequest = async (mentorId: string) => {
        console.log("Sending request to mentor ID:", mentorId);
    try {
        await API.post("/requests", { mentorId });
        setMessage({ text: "✅ Request sent successfully!", type: "success" });
    } catch (err) {
        setMessage({ text: "❌ Failed to send request", type: "error" });
    }

    setTimeout(() => setMessage(null), 3000);
    };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
  <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">🌟 Available Mentors</h2>

  {message && (
    <div
      className={`max-w-md mx-auto mb-6 px-4 py-2 rounded text-white text-center font-medium ${
        message.type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message.text}
    </div>
  )}

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {mentors.map((mentor: any) => (
      <div
        key={mentor._id}
        className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-1">{mentor.name}</h3>
        <p className="text-sm text-gray-600 mb-3 italic">{mentor.bio || "No bio provided."}</p>

        <div className="mb-3">
          <strong className="text-gray-700 block mb-1">Skills:</strong>
          <div className="flex flex-wrap gap-2">
            {mentor.skills?.length ? (
              mentor.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">No skills listed</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <strong className="text-gray-700 block mb-1">Goals:</strong>
          <p className="text-sm text-gray-600">{mentor.goals || "No goals listed"}</p>
        </div>

        <button
          onClick={() => sendRequest(mentor._id)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full transition"
        >
          📩 Send Request
        </button>
      </div>
    ))}
  </div>
</div>

  );
};

export default MentorList;
