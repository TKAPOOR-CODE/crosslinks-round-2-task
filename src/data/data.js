// All dummy data lives here (no backend / database needed for the frontend track).

export const BRANCHES = [
  'Mathematics and Computing',
  'Computer Science',
  'Information Technology',
  'Electronics and Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Instrumentation and Control',
  'Biotechnology',
];

export const TAGS = ['General', 'Academics', 'Placements', 'Societies', 'Hostel', 'Events', 'Tech'];

export const initialPosts = [
  {
    id: 'p1',
    author: { name: 'Riya Malhotra', branch: 'Computer Science', year: '2nd year' },
    text: 'Anyone up for a DSA study group this weekend at the library? Planning to cover graphs and DP. Bring your own doubts.',
    tag: 'Academics',
    time: '25m ago',
    likes: 18,
    liked: false,
    comments: 6,
  },
  {
    id: 'p2',
    author: { name: 'Kabir Anand', branch: 'Electronics and Communication', year: '3rd year' },
    text: 'Our society is hosting a hardware workshop on Arduino and sensors next Friday. Free for all NSUT students, limited seats, so register early.',
    tag: 'Societies',
    time: '2h ago',
    likes: 42,
    liked: true,
    comments: 11,
  },
  {
    id: 'p3',
    author: { name: 'Ishita Verma', branch: 'Mathematics and Computing', year: '1st year' },
    text: 'Lost a blue water bottle near the main canteen yesterday around 4 PM. If you found it, please ping me. It has stickers of a cat on it.',
    tag: 'General',
    time: '5h ago',
    likes: 7,
    liked: false,
    comments: 3,
  },
  {
    id: 'p4',
    author: { name: 'Arjun Mehta', branch: 'Information Technology', year: '4th year' },
    text: 'Placement season tip: do not wait for the company list to start prepping. Resume reviews are open in our group, drop your PDF and I will share feedback.',
    tag: 'Placements',
    time: '1d ago',
    likes: 96,
    liked: false,
    comments: 24,
  },
  {
    id: 'p5',
    author: { name: 'Sneha Rawat', branch: 'Biotechnology', year: '2nd year' },
    text: 'The new mess menu is actually good this week. Paneer on Wednesday is a must try. That is all, carry on.',
    tag: 'Hostel',
    time: '1d ago',
    likes: 53,
    liked: false,
    comments: 15,
  },
];

export const initialThreads = [
  {
    id: 't1',
    title: 'How do you balance coding practice with the first-semester syllabus?',
    body: 'I just joined and the syllabus already feels heavy. How are seniors managing LeetCode or projects along with classes and assignments? Any schedule that worked for you?',
    tag: 'Academics',
    author: 'Ishita Verma',
    time: '3h ago',
    votes: 24,
    replies: [
      { id: 'r1', author: 'Arjun Mehta', text: 'Keep a fixed 90 minute slot every day, even if it is just one problem. Consistency beats weekend marathons.', time: '2h ago', votes: 9 },
      { id: 'r2', author: 'Riya Malhotra', text: 'Pick one thing per month. Last month I only did arrays and nothing else. Much less overwhelming.', time: '1h ago', votes: 5 },
    ],
  },
  {
    id: 't2',
    title: 'Which societies are worth joining in the first year?',
    body: 'There are so many societies on campus. Which ones have actually helped you learn something or get better opportunities? Also how much time do they take?',
    tag: 'Societies',
    author: 'Kabir Anand',
    time: '1d ago',
    votes: 41,
    replies: [
      { id: 'r3', author: 'Sneha Rawat', text: 'Join one tech and one non-tech. Do not overcommit in semester one, you can add more later.', time: '22h ago', votes: 14 },
    ],
  },
  {
    id: 't3',
    title: 'Best places to study late at night on campus?',
    body: 'The hostel gets noisy during fests. Looking for quiet spots that stay open till late. Library timings seem to end early.',
    tag: 'General',
    author: 'Aman Gupta',
    time: '2d ago',
    votes: 12,
    replies: [],
  },
  {
    id: 't4',
    title: 'Resources for Linear Algebra in sem 1 (MAC)?',
    body: 'Looking for good lecture series and problem books. Prof notes are a bit fast for me.',
    tag: 'Academics',
    author: 'Tanvi Sethi',
    time: '3d ago',
    votes: 19,
    replies: [
      { id: 'r4', author: 'Arjun Mehta', text: 'Gilbert Strang lectures on MIT OCW. Pair them with Schaum problem sets.', time: '3d ago', votes: 11 },
      { id: 'r5', author: 'Riya Malhotra', text: 'Also try 3Blue1Brown essence of linear algebra for intuition first.', time: '3d ago', votes: 8 },
    ],
  },
];

export const initialAnnouncements = [
  {
    id: 'a1',
    title: 'Mid-semester exam schedule released',
    body: 'The mid-semester examination schedule for all branches has been uploaded on the academic portal. Students are advised to check their seating plan one day prior to the exam.',
    category: 'Academic',
    author: 'Examination Cell',
    date: '2026-10-09',
    pinned: true,
  },
  {
    id: 'a2',
    title: 'Technical fest registrations are open',
    body: 'Registrations for events and workshops are open till 20 October. Team sizes and rules are listed on the fest page. Early registrations get free merchandise.',
    category: 'Events',
    author: 'Student Council',
    date: '2026-10-08',
    pinned: true,
  },
  {
    id: 'a3',
    title: 'Library timings extended during exams',
    body: 'The central library will remain open until 11 PM from 14 October to 30 October. ID card is mandatory for entry.',
    category: 'Campus',
    author: 'Central Library',
    date: '2026-10-07',
    pinned: false,
  },
  {
    id: 'a4',
    title: 'Pre-placement talk: Product companies',
    body: 'A pre-placement talk for pre-final and final year students will be held in the main auditorium on 15 October at 3:00 PM. Attendance is compulsory for registered candidates.',
    category: 'Placements',
    author: 'Training and Placement Cell',
    date: '2026-10-05',
    pinned: false,
  },
  {
    id: 'a5',
    title: 'Hostel maintenance on Sunday',
    body: 'Water supply will be paused between 10 AM and 1 PM this Sunday for tank cleaning. Please store water in advance.',
    category: 'Campus',
    author: 'Hostel Office',
    date: '2026-10-04',
    pinned: false,
  },
];

export const ANNOUNCEMENT_CATEGORIES = ['Academic', 'Events', 'Campus', 'Placements'];

// Timetable: day 1 = Monday ... 5 = Friday. start/end are 24h hours.
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const HOURS = [9, 10, 11, 12, 13, 14, 15, 16];

export const timetable = [
  { id: 'c1', day: 1, start: 9, end: 10, subject: 'Calculus', code: 'MAC101', room: 'LT-2', type: 'Lecture', faculty: 'Dr. R. Kapoor' },
  { id: 'c2', day: 1, start: 10, end: 11, subject: 'Linear Algebra', code: 'MAC103', room: 'LT-2', type: 'Lecture', faculty: 'Dr. S. Nair' },
  { id: 'c3', day: 1, start: 12, end: 14, subject: 'Programming Lab (C)', code: 'MAC105L', room: 'Lab-4', type: 'Lab', faculty: 'Ms. P. Jain' },
  { id: 'c4', day: 2, start: 9, end: 10, subject: 'Physics', code: 'PHY101', room: 'LT-5', type: 'Lecture', faculty: 'Dr. A. Singh' },
  { id: 'c5', day: 2, start: 11, end: 12, subject: 'Programming Fundamentals', code: 'MAC105', room: 'LT-3', type: 'Lecture', faculty: 'Mr. V. Bansal' },
  { id: 'c6', day: 2, start: 14, end: 15, subject: 'Communication Skills', code: 'HUM101', room: 'SR-12', type: 'Tutorial', faculty: 'Ms. D. Arora' },
  { id: 'c7', day: 3, start: 9, end: 10, subject: 'Linear Algebra', code: 'MAC103', room: 'LT-2', type: 'Lecture', faculty: 'Dr. S. Nair' },
  { id: 'c8', day: 3, start: 10, end: 11, subject: 'Calculus', code: 'MAC101', room: 'LT-2', type: 'Tutorial', faculty: 'Dr. R. Kapoor' },
  { id: 'c9', day: 3, start: 13, end: 15, subject: 'Physics Lab', code: 'PHY101L', room: 'Lab-1', type: 'Lab', faculty: 'Dr. A. Singh' },
  { id: 'c10', day: 4, start: 10, end: 11, subject: 'Programming Fundamentals', code: 'MAC105', room: 'LT-3', type: 'Lecture', faculty: 'Mr. V. Bansal' },
  { id: 'c11', day: 4, start: 11, end: 12, subject: 'Physics', code: 'PHY101', room: 'LT-5', type: 'Lecture', faculty: 'Dr. A. Singh' },
  { id: 'c12', day: 4, start: 15, end: 16, subject: 'Discrete Maths', code: 'MAC107', room: 'LT-4', type: 'Lecture', faculty: 'Dr. M. Saxena' },
  { id: 'c13', day: 5, start: 9, end: 10, subject: 'Discrete Maths', code: 'MAC107', room: 'LT-4', type: 'Lecture', faculty: 'Dr. M. Saxena' },
  { id: 'c14', day: 5, start: 11, end: 12, subject: 'Calculus', code: 'MAC101', room: 'LT-2', type: 'Lecture', faculty: 'Dr. R. Kapoor' },
  { id: 'c15', day: 5, start: 14, end: 15, subject: 'Society Hour', code: 'ECA', room: 'Ground', type: 'Activity', faculty: '-' },
];

export function fmtHour(h) {
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hr = h > 12 ? h - 12 : h;
  return `${hr}:00 ${suffix}`;
}
