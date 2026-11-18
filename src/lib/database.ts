import { Certificate } from '@/types/certificate';

const STORAGE_KEY = 'maxim_code_certificates';
const ADMIN_PASSWORD = 'MaximAdmin2026';

// ── Seed Data ──────────────────────────────────────────────────────────────
const SEED_CERTIFICATES: Certificate[] = [
  {
    id: 'MC-2026-0001',
    studentName: 'Aryan Sharma',
    internship: 'Web Development Internship',
    domain: 'Web Development',
    role: 'Frontend Developer Intern',
    startDate: '2026-01-05',
    endDate: '2026-04-05',
    issueDate: '2026-04-10',
    skills: ['React', 'Node.js', 'Tailwind CSS', 'MongoDB', 'REST APIs'],
    status: 'VERIFIED',
    qrUrl: 'https://maximcode.vercel.app/verify/MC-2026-0001',
    email: 'aryan@example.com',
    createdAt: '2026-04-10T10:00:00Z',
  },
  {
    id: 'MC-2026-0002',
    studentName: 'Priya Nair',
    internship: 'AI & Machine Learning Internship',
    domain: 'AI & Machine Learning',
    role: 'AI/ML Engineer Intern',
    startDate: '2026-01-10',
    endDate: '2026-04-10',
    issueDate: '2026-04-15',
    skills: ['Python', 'TensorFlow', 'OpenAI API', 'LangChain', 'NLP'],
    status: 'VERIFIED',
    qrUrl: 'https://maximcode.vercel.app/verify/MC-2026-0002',
    email: 'priya@example.com',
    createdAt: '2026-04-15T11:00:00Z',
  },
  {
    id: 'MC-2026-0003',
    studentName: 'Reza Al-Farsi',
    internship: 'Digital Marketing Internship',
    domain: 'Digital Marketing',
    role: 'Digital Marketing Intern',
    startDate: '2026-02-01',
    endDate: '2026-05-01',
    issueDate: '2026-05-05',
    skills: ['SEO', 'Google Ads', 'Analytics', 'Meta Ads', 'Content Strategy'],
    status: 'VERIFIED',
    qrUrl: 'https://maximcode.vercel.app/verify/MC-2026-0003',
    email: 'reza@example.com',
    createdAt: '2026-05-05T09:00:00Z',
  },
  {
    id: 'MC-2026-0004',
    studentName: 'Sneha Kapoor',
    internship: 'App Development Internship',
    domain: 'App Development',
    role: 'Flutter Developer Intern',
    startDate: '2026-01-15',
    endDate: '2026-04-15',
    issueDate: '2026-04-20',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST API', 'UI/UX'],
    status: 'VERIFIED',
    qrUrl: 'https://maximcode.vercel.app/verify/MC-2026-0004',
    email: 'sneha@example.com',
    createdAt: '2026-04-20T14:00:00Z',
  },
  {
    id: 'MC-2026-0005',
    studentName: 'Mohamed Hassan',
    internship: 'Data Science Internship',
    domain: 'Data Science',
    role: 'Data Science Intern',
    startDate: '2026-02-10',
    endDate: '2026-05-10',
    issueDate: '2026-05-15',
    skills: ['Python', 'Pandas', 'SQL', 'Tableau', 'Scikit-learn'],
    status: 'VERIFIED',
    qrUrl: 'https://maximcode.vercel.app/verify/MC-2026-0005',
    email: 'mohamed@example.com',
    createdAt: '2026-05-15T10:30:00Z',
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function load(): Certificate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Certificate[];
  } catch {
    return [];
  }
}

function save(certs: Certificate[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
}

function ensureSeeded(): void {
  const existing = load();
  if (existing.length === 0) {
    save(SEED_CERTIFICATES);
  }
}

function getAll(): Certificate[] {
  ensureSeeded();
  return load();
}

function getNextId(): string {
  const all = getAll();
  if (all.length === 0) return 'MC-2026-0001';
  const nums = all
    .map(c => parseInt(c.id.split('-')[2], 10))
    .filter(n => !isNaN(n));
  const max = Math.max(...nums);
  return `MC-2026-${String(max + 1).padStart(4, '0')}`;
}

// ── Public API ─────────────────────────────────────────────────────────────
export const db = {
  /** Verify a certificate by ID */
  verify(id: string): Certificate | null {
    const certs = getAll();
    return certs.find(c => c.id.toUpperCase() === id.trim().toUpperCase()) ?? null;
  },

  /** Get all certificates */
  getAll(): Certificate[] {
    return getAll();
  },

  /** Create a new certificate */
  create(data: Omit<Certificate, 'id' | 'qrUrl' | 'createdAt'>): Certificate {
    const all = getAll();
    const id = getNextId();
    const cert: Certificate = {
      ...data,
      id,
      qrUrl: `https://maximcode.vercel.app/verify/${id}`,
      createdAt: new Date().toISOString(),
    };
    save([...all, cert]);
    return cert;
  },

  /** Update an existing certificate */
  update(id: string, data: Partial<Certificate>): Certificate | null {
    const all = getAll();
    const idx = all.findIndex(c => c.id === id);
    if (idx === -1) return null;
    const updated = { ...all[idx], ...data, id }; // prevent ID change
    all[idx] = updated;
    save(all);
    return updated;
  },

  /** Delete a certificate */
  delete(id: string): boolean {
    const all = getAll();
    const filtered = all.filter(c => c.id !== id);
    if (filtered.length === all.length) return false;
    save(filtered);
    return true;
  },

  /** Search certificates */
  search(query: string): Certificate[] {
    const q = query.toLowerCase().trim();
    if (!q) return getAll();
    return getAll().filter(
      c =>
        c.id.toLowerCase().includes(q) ||
        c.studentName.toLowerCase().includes(q) ||
        c.domain.toLowerCase().includes(q) ||
        c.internship.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q)
    );
  },

  /** Admin auth */
  checkAdminPassword(password: string): boolean {
    return password === ADMIN_PASSWORD;
  },

  isAdminLoggedIn(): boolean {
    return sessionStorage.getItem('mc_admin_auth') === 'true';
  },

  adminLogin(password: string): boolean {
    if (this.checkAdminPassword(password)) {
      sessionStorage.setItem('mc_admin_auth', 'true');
      return true;
    }
    return false;
  },

  adminLogout(): void {
    sessionStorage.removeItem('mc_admin_auth');
  },
};
