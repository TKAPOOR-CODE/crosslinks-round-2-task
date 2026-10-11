import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import { ANNOUNCEMENT_CATEGORIES } from '../data/data.js';

const fmtDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Announcements() {
  const { user } = useAuth();
  const { announcements, addAnnouncement, togglePin, deleteAnnouncement } = useData();
  const isAdmin = user.role === 'admin';
  const [cat, setCat] = useState('All');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Academic');

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    addAnnouncement(user, { title: title.trim(), body: body.trim(), category, pinned: false });
    setTitle('');
    setBody('');
  };

  const shown = announcements
    .filter((a) => cat === 'All' || a.category === cat)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <div className="narrow">
      <header className="page-head">
        <h1>Announcements</h1>
        <p className="muted">Official notices from the college, cells and societies.</p>
      </header>

      {isAdmin && (
        <form className="card form-card" onSubmit={submit}>
          <h3>Post an announcement</h3>
          <label htmlFor="a-title">Title</label>
          <input id="a-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="a-body">Message</label>
          <textarea id="a-body" rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
          <div className="row between">
            <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {ANNOUNCEMENT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button className="btn-primary" disabled={!title.trim() || !body.trim()}>Publish</button>
          </div>
        </form>
      )}

      <div className="chips">
        {['All', ...ANNOUNCEMENT_CATEGORIES].map((c) => (
          <button key={c} className={'chip' + (cat === c ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {shown.length === 0 && <p className="empty">No announcements in {cat}.</p>}

      {shown.map((a) => (
        <article key={a.id} className={'card notice' + (a.pinned ? ' pinned' : '')}>
          <div className="row between center wrap">
            <div className="row gap center">
              <span className="tag">{a.category}</span>
              {a.pinned && <span className="pin-label">Pinned</span>}
            </div>
            <span className="muted small">{fmtDate(a.date)}</span>
          </div>
          <h3>{a.title}</h3>
          <p>{a.body}</p>
          <div className="row between center">
            <span className="muted small">Posted by {a.author}</span>
            {isAdmin && (
              <div className="row gap">
                <button className="btn-ghost small" onClick={() => togglePin(a.id)}>{a.pinned ? 'Unpin' : 'Pin'}</button>
                <button className="btn-ghost small danger" onClick={() => deleteAnnouncement(a.id)}>Delete</button>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
