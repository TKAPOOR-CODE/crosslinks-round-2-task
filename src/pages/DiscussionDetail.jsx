import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import Avatar from '../components/Avatar.jsx';

export default function DiscussionDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { threads, voteThread, addReply } = useData();
  const [text, setText] = useState('');
  const thread = threads.find((t) => t.id === id);

  if (!thread) {
    return (
      <div className="narrow">
        <p className="empty">This discussion does not exist anymore.</p>
        <Link to="/discussions" className="link">Back to discussions</Link>
      </div>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addReply(thread.id, user, text.trim());
    setText('');
  };

  return (
    <div className="narrow">
      <Link to="/discussions" className="link">Back to discussions</Link>

      <article className="card detail">
        <span className="tag">{thread.tag}</span>
        <h1>{thread.title}</h1>
        <div className="row gap center small muted">
          <Avatar name={thread.author} size={28} />
          <span>{thread.author}</span>
          <span>{thread.time}</span>
        </div>
        <p className="body-text">{thread.body}</p>
        <button className="btn-ghost small" onClick={() => voteThread(thread.id)}>
          ▲ Upvote ({thread.votes})
        </button>
      </article>

      <h2 className="section-title">{thread.replies.length} {thread.replies.length === 1 ? 'reply' : 'replies'}</h2>

      {thread.replies.length === 0 && <p className="empty">No replies yet. Share what you know.</p>}

      {thread.replies.map((r) => (
        <div key={r.id} className="card reply">
          <Avatar name={r.author} size={34} />
          <div>
            <div className="post-head">
              <strong>{r.author}</strong>
              <span className="muted small">{r.time}</span>
            </div>
            <p>{r.text}</p>
          </div>
        </div>
      ))}

      <form className="card form-card" onSubmit={submit}>
        <label htmlFor="reply">Your reply</label>
        <textarea id="reply" rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a helpful answer" />
        <div className="row end">
          <button className="btn-primary" disabled={!text.trim()}>Post reply</button>
        </div>
      </form>
    </div>
  );
}
