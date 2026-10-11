import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import { TAGS } from '../data/data.js';

export default function Discussions() {
  const { user } = useAuth();
  const { threads, addThread } = useData();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('All');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [newTag, setNewTag] = useState('General');

  const shown = threads.filter(
    (t) =>
      (tag === 'All' || t.tag === tag) &&
      (t.title + t.body).toLowerCase().includes(q.toLowerCase())
  );

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const id = addThread(user, title.trim(), body.trim(), newTag);
    setTitle('');
    setBody('');
    setOpen(false);
    navigate(`/discussions/${id}`);
  };

  return (
    <div className="narrow">
      <header className="page-head row between center">
        <div>
          <h1>Discussions</h1>
          <p className="muted">Ask questions, share resources, help each other out.</p>
        </div>
        <button className="btn-primary" onClick={() => setOpen((o) => !o)}>
          {open ? 'Cancel' : 'New discussion'}
        </button>
      </header>

      {open && (
        <form className="card form-card" onSubmit={submit}>
          <label htmlFor="d-title">Title</label>
          <input id="d-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What do you want to ask?" />
          <label htmlFor="d-body">Details</label>
          <textarea id="d-body" rows={4} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Add some context so people can answer well." />
          <div className="row between">
            <select aria-label="Topic" value={newTag} onChange={(e) => setNewTag(e.target.value)}>
              {TAGS.map((t) => <option key={t}>{t}</option>)}
            </select>
            <button className="btn-primary" disabled={!title.trim() || !body.trim()}>Post discussion</button>
          </div>
        </form>
      )}

      <div className="row gap wrap">
        <input className="grow" type="search" aria-label="Search discussions" placeholder="Search discussions" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="Filter by topic" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option>All</option>
          {TAGS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      {shown.length === 0 && <p className="empty">Nothing matches your search. Try different words or start a new discussion.</p>}

      {shown.map((t) => (
        <Link to={`/discussions/${t.id}`} key={t.id} className="card thread">
          <div className="votes">
            <strong>{t.votes}</strong>
            <small>votes</small>
          </div>
          <div>
            <h3>{t.title}</h3>
            <p className="muted clamp">{t.body}</p>
            <div className="row gap center small muted">
              <span className="tag">{t.tag}</span>
              <span>{t.author}</span>
              <span>{t.time}</span>
              <span>{t.replies.length} replies</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
