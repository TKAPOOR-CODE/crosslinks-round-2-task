import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const res = login(email, role);
    if (!res.ok) setError(res.error);
  };

  const demo = (r) => {
    login(r === 'admin' ? 'training.cell@nsut.ac.in' : 'aarav.sharma@nsut.ac.in', r);
  };

  return (
    <div className="login">
      <section className="login-hero">
        <h1>One place for everything NSUT.</h1>
        <p>Talk to your batch, catch every notice from the college, and never miss a class again.</p>
        <ul className="hero-list">
          <li>Discussions that stay organised by topic</li>
          <li>Announcements from exam cell, placement cell and societies</li>
          <li>Your weekly timetable, ready on any screen</li>
        </ul>
      </section>

      <section className="login-card" aria-labelledby="login-title">
        <h2 id="login-title">Sign in</h2>
        <p className="muted">Use your college Google account (@nsut.ac.in).</p>

        <form onSubmit={submit} noValidate>
          <label htmlFor="email">College email</label>
          <input
            id="email"
            type="email"
            placeholder="name.branch@nsut.ac.in"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            autoComplete="email"
          />

          <div className="seg" role="radiogroup" aria-label="Role">
            {['student', 'admin'].map((r) => (
              <button
                type="button"
                key={r}
                role="radio"
                aria-checked={role === r}
                className={role === r ? 'on' : ''}
                onClick={() => setRole(r)}
              >
                {r === 'student' ? 'Student' : 'Admin'}
              </button>
            ))}
          </div>

          {error && <p className="error" role="alert">{error}</p>}

          <button className="btn-primary wide" type="submit">Continue with Google</button>
        </form>

        <div className="divider"><span>or try a demo account</span></div>
        <div className="row gap">
          <button className="btn-ghost grow" onClick={() => demo('student')}>Demo student</button>
          <button className="btn-ghost grow" onClick={() => demo('admin')}>Demo admin</button>
        </div>
        <p className="tiny muted">Dummy login for the frontend demo. Any @nsut.ac.in address works, other domains are rejected.</p>
      </section>
    </div>
  );
}
