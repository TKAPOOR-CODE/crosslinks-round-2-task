import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from './Avatar.jsx';

const NAV = [
  { to: '/', label: 'Feed', end: true },
  { to: '/discussions', label: 'Discussions' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/timetable', label: 'Timetable' },
  { to: '/profile', label: 'Profile' },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">N</span>
          <span className="brand-name">NSUT Connect</span>
        </div>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="side-user">
          <Avatar name={user.name} size={36} />
          <div className="side-user-text">
            <strong>{user.name}</strong>
            <span>{user.role === 'admin' ? 'Admin' : 'Student'}</span>
          </div>
          <button className="btn-ghost small" onClick={handleLogout}>Log out</button>
        </div>
      </aside>
      <main className="main">{children}</main>
      <nav className="bottom-nav" aria-label="Main mobile">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'bottom-link' + (isActive ? ' active' : '')}>
            {n.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
