import { createContext, useContext, useState } from 'react';
import { initialPosts, initialThreads, initialAnnouncements } from '../data/data.js';

const DataContext = createContext(null);
let counter = 100;
const nid = (p) => `${p}${++counter}`;

export function DataProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);
  const [threads, setThreads] = useState(initialThreads);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  const addPost = (user, text, tag) =>
    setPosts((p) => [
      {
        id: nid('p'),
        author: { name: user.name, branch: user.branch, year: user.year },
        text,
        tag,
        time: 'just now',
        likes: 0,
        liked: false,
        comments: 0,
      },
      ...p,
    ]);

  const toggleLike = (id) =>
    setPosts((p) =>
      p.map((x) => (x.id === id ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x))
    );

  const addThread = (user, title, body, tag) => {
    const id = nid('t');
    setThreads((t) => [
      { id, title, body, tag, author: user.name, time: 'just now', votes: 0, replies: [] },
      ...t,
    ]);
    return id;
  };

  const voteThread = (id) =>
    setThreads((t) => t.map((x) => (x.id === id ? { ...x, votes: x.votes + 1 } : x)));

  const addReply = (threadId, user, text) =>
    setThreads((t) =>
      t.map((x) =>
        x.id === threadId
          ? { ...x, replies: [...x.replies, { id: nid('r'), author: user.name, text, time: 'just now', votes: 0 }] }
          : x
      )
    );

  const addAnnouncement = (user, data) =>
    setAnnouncements((a) => [
      { id: nid('a'), ...data, author: user.name, date: new Date().toISOString().slice(0, 10) },
      ...a,
    ]);

  const togglePin = (id) =>
    setAnnouncements((a) => a.map((x) => (x.id === id ? { ...x, pinned: !x.pinned } : x)));

  const deleteAnnouncement = (id) => setAnnouncements((a) => a.filter((x) => x.id !== id));

  return (
    <DataContext.Provider
      value={{
        posts, addPost, toggleLike,
        threads, addThread, voteThread, addReply,
        announcements, addAnnouncement, togglePin, deleteAnnouncement,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
