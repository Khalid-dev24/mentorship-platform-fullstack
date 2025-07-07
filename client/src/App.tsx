import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MentorList from "./pages/MentorList";
import SentRequests from "./pages/SentRequests";
import ReceivedRequests from "./pages/ReceivedRequest";
import Sessions from "./pages/Sessions"; 
import FeedbackForm from "./pages/FeedbackForm";
import AdminDashboard from "./pages/AdminDashboard";
import CreateProfile from "./pages/CreateProfile";
import EditProfile from "./pages/EditProfile";
import BookSession from "./pages/BookSession";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mentors" element={<MentorList />} />
        <Route path="/requests/sent" element={<SentRequests />} />
        <Route path="/requests/received" element={<ReceivedRequests />} />
        <Route path="/requests/sessions" element={<Sessions />} />
        <Route path="/feedback/:sessionId" element={<FeedbackForm />} />
        <Route path="/book-session/:mentorId" element={<BookSession />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/create-profile" element={<CreateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
