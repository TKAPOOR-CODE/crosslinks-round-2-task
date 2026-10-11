import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import { DAYS, TAGS, fmtHour, timetable } from '../data/data.js';
import Avatar from '../components/Avatar.jsx';

function TodayCard() {
  const jsDay = new Date().getDay(); // 0 Sun
  const isWeekend = jsDay === 0 || jsDay === 6;
  const day = isWeekend ? 1 : jsDay;
  const classes = timetable.filter((c) => c.day === day).sort((a, b) => a.start - b.start);
  return (
    <section className="card side-card">
      <h3>{isWeekend ? 'Monday’s classes' : 'Today’s classes'}</h3>
      {classes.length === 0 ? (
        <p className="muted">No classes scheduled.</p>
      ) : (
        <ul className="mini-list">
          {classes.map((c) => (
            <li key={c.id}>
              <span className="mini-time">{fmtHour(c.start)}</span>
              <span>
                <strong>{c.subject}</strong>
                <small>{c.room}</small>
              </span>
            </li>
          ))}
        </ul>
      )}
      <Link to="/timetable" className="link">Open full timetable</Link>
    </section>
  );
}

export default function Feed() {
  const { user } = useAuth();
  const { posts, addPost, toggleLike, announcements } = useData();
  const [text, setText] = useState('');
  const [tag, setTag] = useState('General');
  const [filter, setFilter] = useState('All');

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addPost(user, text.trim(), tag);
    setText('');
  };

  const shown = filter === 'All' ? posts : posts.filter((p) => p.tag === filter);
  const pinned = announcements.filter((a) => a.pinned).slice(0, 2);

  return (
    <div className="two-col">
      <div>
        <header className="page-head">
          <h1>Campus feed</h1>
          <p className="muted">Hi {user.name.split(' ')[0]}, here is what is happening around NSUT.</p>
        </header>

        <form className="card composer" onSubmit={submit}>
          <Avatar name={user.name} />
          <div className="composer-body">
            <label htmlFor="post-text" className="sr-only">Write a post</label>
            <textarea
              id="post-text"
              rows={3}
              placeholder="Share something with the campus..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="row between">
              <select aria-label="Topic" value={tag} onChange={(e) => setTag(e.target.value)}>
                {TAGS.map((t) => <option key={t}>{t}</option>)}
              </select>
              <button className="btn-primary" disabled={!text.trim()}>Post</button>
            </div>
          </div>
        </form>

        <div className="chips" role="tablist" aria-label="Filter posts">
          {['All', ...TAGS].map((t) => (
            <button key={t} className={'chip' + (filter === t ? ' on' : '')} onClick={() => setFilter(t)}>{t}</button>
          ))}
        </div>

        {shown.length === 0 && <p className="empty">No posts under {filter} yet. Be the first to write one.</p>}

        {shown.map((p) => (
          <article key={p.id} className="card post">
            <Avatar name={p.author.name} />
            <div className="post-body">
              <div className="post-head">
                <strong>{p.author.name}</strong>
                <span className="muted small">{p.author.branch}, {p.author.year} · {p.time}</span>
              </div>
              <p>{p.text}</p>
              <div className="row gap center">
                <span className="tag">{p.tag}</span>
                <button
                  className={'like' + (p.liked ? ' on' : '')}
                  onClick={() => toggleLike(p.id)}
                  aria-pressed={p.liked}
                >
                  {p.liked ? '♥' : '♡'} {p.likes}
                </button>
                <span className="muted small">{p.comments} comments</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="rail">
        <TodayCard />
        <section className="card side-card">
          <h3>Pinned notices</h3>
          {pinned.map((a) => (
            <div key={a.id} className="pin">
              <strong>{a.title}</strong>
              <small>{a.author}</small>
            </div>
          ))}
          <Link to="/announcements" className="link">All announcements</Link>
        </section>
      </aside>
    </div>
  );
}
