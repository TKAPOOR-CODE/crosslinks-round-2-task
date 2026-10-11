import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Feed from './pages/Feed.jsx';
import Discussions from './pages/Discussions.jsx';
import DiscussionDetail from './pages/DiscussionDetail.jsx';
import Announcements from './pages/Announcements.jsx';
import Timetable from './pages/Timetable.jsx';
import Profile from './pages/Profile.jsx';

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<Protected><Feed /></Protected>} />
      <Route path="/discussions" element={<Protected><Discussions /></Protected>} />
      <Route path="/discussions/:id" element={<Protected><DiscussionDetail /></Protected>} />
      <Route path="/announcements" element={<Protected><Announcements /></Protected>} />
      <Route path="/timetable" element={<Protected><Timetable /></Protected>} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
