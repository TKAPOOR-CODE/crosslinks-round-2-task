const COLORS = ['#2340C9', '#F2542D', '#1B8A5A', '#8A3FFC', '#C2410C', '#0E7490', '#B4236B'];

export default function Avatar({ name = '?', size = 40 }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, background: COLORS[hash % COLORS.length], fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
