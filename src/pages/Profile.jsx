import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import { BRANCHES } from '../data/data.js';
import Avatar from '../components/Avatar.jsx';

const YEARS = ['1st year', '2nd year', '3rd year', '4th year'];

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const { posts, threads } = useData();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [branch, setBranch] = useState(user.branch);
  const [year, setYear] = useState(user.year);
  const [bio, setBio] = useState(user.bio);
  const [saved, setSaved] = useState(false);

  const myPosts = posts.filter((p) => p.author.name === user.name).length;
  const myThreads = threads.filter((t) => t.author === user.name).length;

  const save = (e) => {
    e.preventDefault();
    updateUser({ name: name.trim() || user.name, branch, year, bio });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="narrow">
      <header className="card profile-head">
        <Avatar name={user.name} size={72} />
        <div>
          <h1>{user.name}</h1>
          <p className="muted">{user.email}</p>
          <span className="tag">{user.role === 'admin' ? 'Admin' : 'Student'}</span>
        </div>
      </header>

      <div className="stats">
        <div className="card stat"><strong>{myPosts}</strong><span>Posts</span></div>
        <div className="card stat"><strong>{myThreads}</strong><span>Discussions</span></div>
        <div className="card stat"><strong>{user.year}</strong><span>Year</span></div>
      </div>

      <form className="card form-card" onSubmit={save}>
        <h3>Edit profile</h3>
        <label htmlFor="p-name">Full name</label>
        <input id="p-name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="p-branch">Branch</label>
        <select id="p-branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
          {BRANCHES.map((b) => <option key={b}>{b}</option>)}
        </select>
        <label htmlFor="p-year">Year</label>
        <select id="p-year" value={year} onChange={(e) => setYear(e.target.value)}>
          {YEARS.map((y) => <option key={y}>{y}</option>)}
        </select>
        <label htmlFor="p-bio">Bio</label>
        <textarea id="p-bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A line about you" />
        <div className="row between center">
          <span className="ok" role="status">{saved ? 'Profile saved' : ''}</span>
          <button className="btn-primary">Save changes</button>
        </div>
      </form>

      <button className="btn-ghost danger" onClick={() => { logout(); navigate('/login'); }}>Log out</button>
    </div>
  );
}
