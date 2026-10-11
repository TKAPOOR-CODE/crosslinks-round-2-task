import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const KEY = 'nsut_connect_user';

export const isNsutEmail = (email) => /^[^\s@]+@nsut\.ac\.in$/i.test(email.trim());

function nameFromEmail(email) {
  const local = email.split('@')[0].replace(/[0-9]/g, '');
  return (
    local
      .split(/[._-]+/)
      .filter(Boolean)
      .map((p) => p[0].toUpperCase() + p.slice(1))
      .join(' ') || 'NSUT Student'
  );
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch {
      return null;
    }
  });

  const persist = (u) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(KEY, JSON.stringify(u));
      else localStorage.removeItem(KEY);
    } catch {
      /* storage blocked, ignore */
    }
  };

  // Dummy "Google login": only @nsut.ac.in emails are accepted.
  const login = (email, role) => {
    if (!isNsutEmail(email)) {
      return { ok: false, error: 'Only @nsut.ac.in accounts can sign in.' };
    }
    persist({
      email: email.trim().toLowerCase(),
      name: nameFromEmail(email),
      role,
      branch: 'Mathematics and Computing',
      year: '1st year',
      bio: '',
    });
    return { ok: true };
  };

  const logout = () => persist(null);
  const updateUser = (patch) => persist({ ...user, ...patch });

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
