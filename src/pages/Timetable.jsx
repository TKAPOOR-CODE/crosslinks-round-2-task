import { useState } from 'react';
import { DAYS, HOURS, fmtHour, timetable } from '../data/data.js';

const todayIdx = () => {
  const d = new Date().getDay();
  return d >= 1 && d <= 5 ? d : 1;
};

export default function Timetable() {
  const [view, setView] = useState(() => (window.innerWidth < 760 ? 'day' : 'week'));
  const [day, setDay] = useState(todayIdx());
  const today = new Date().getDay();
  const nowHour = new Date().getHours();

  const dayClasses = timetable.filter((c) => c.day === day).sort((a, b) => a.start - b.start);

  return (
    <div>
      <header className="page-head row between center wrap">
        <div>
          <h1>Timetable</h1>
          <p className="muted">Semester I · Mathematics and Computing · Section A</p>
        </div>
        <div className="seg compact" role="radiogroup" aria-label="View">
          {[['week', 'Week'], ['day', 'Day']].map(([v, l]) => (
            <button key={v} role="radio" aria-checked={view === v} className={view === v ? 'on' : ''} onClick={() => setView(v)}>{l}</button>
          ))}
        </div>
      </header>

      <div className="legend">
        <span className="dot lecture" /> Lecture
        <span className="dot tutorial" /> Tutorial
        <span className="dot lab" /> Lab
        <span className="dot activity" /> Activity
      </div>

      {view === 'week' ? (
        <div className="tt-scroll">
          <div className="tt-grid" style={{ gridTemplateRows: `44px repeat(${HOURS.length}, 76px)` }}>
            <div className="tt-corner" />
            {DAYS.map((d, i) => (
              <div key={d} className={'tt-day' + (today === i + 1 ? ' now' : '')} style={{ gridColumn: i + 2, gridRow: 1 }}>{d}</div>
            ))}
            {HOURS.map((h, i) => (
              <div key={h} className="tt-hour" style={{ gridColumn: 1, gridRow: i + 2 }}>{fmtHour(h)}</div>
            ))}
            {HOURS.flatMap((h, r) =>
              DAYS.map((d, c) => (
                <div key={`${h}-${d}`} className="tt-cell" style={{ gridColumn: c + 2, gridRow: r + 2 }} />
              ))
            )}
            {timetable.map((c) => (
              <div
                key={c.id}
                className={`tt-class ${c.type.toLowerCase()}` + (today === c.day && nowHour >= c.start && nowHour < c.end ? ' live' : '')}
                style={{ gridColumn: c.day + 1, gridRow: `${c.start - 9 + 2} / span ${c.end - c.start}` }}
              >
                <strong>{c.subject}</strong>
                <span>{c.room} · {c.code}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="chips">
            {DAYS.map((d, i) => (
              <button key={d} className={'chip' + (day === i + 1 ? ' on' : '')} onClick={() => setDay(i + 1)}>{d}</button>
            ))}
          </div>
          {dayClasses.length === 0 && <p className="empty">No classes on this day.</p>}
          {dayClasses.map((c) => (
            <div key={c.id} className={`card day-class ${c.type.toLowerCase()}`}>
              <div className="day-time">
                <strong>{fmtHour(c.start)}</strong>
                <small>{fmtHour(c.end)}</small>
              </div>
              <div>
                <h3>{c.subject}</h3>
                <p className="muted small">{c.type} · {c.code} · {c.room}</p>
                <p className="muted small">{c.faculty}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
