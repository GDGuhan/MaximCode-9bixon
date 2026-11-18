import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Search, Edit2, Trash2, Download, Eye, RefreshCw, LogOut,
  Users, Award, ShieldCheck, Calendar, X, Save, Filter
} from 'lucide-react';
import { db } from '@/lib/database';
import { Certificate } from '@/types/certificate';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { DOMAINS, ROLES_BY_DOMAIN, SKILLS_BY_DOMAIN } from '@/constants';
import CertificateCard from '@/components/features/CertificateCard';
import QRCodeDisplay from '@/components/features/QRCodeDisplay';

type ModalType = 'none' | 'create' | 'edit' | 'view' | 'qr' | 'delete';

const emptyForm = (): Omit<Certificate, 'id' | 'qrUrl' | 'createdAt'> => ({
  studentName: '',
  internship: '',
  domain: DOMAINS[0],
  role: '',
  startDate: '',
  endDate: '',
  issueDate: new Date().toISOString().slice(0, 10),
  skills: [],
  status: 'VERIFIED',
  email: '',
  certificatePdfUrl: '',
  certificateImageUrl: '',
});

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [query, setQuery] = useState('');
  const [filterDomain, setFilterDomain] = useState('');
  const [modal, setModal] = useState<ModalType>('none');
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => setCerts(db.getAll());

  useEffect(() => {
    if (!db.isAdminLoggedIn()) { navigate('/admin'); return; }
    load();
  }, [navigate]);

  const filtered = useMemo(() => {
    let list = query ? db.search(query) : certs;
    if (filterDomain) list = list.filter(c => c.domain === filterDomain);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [certs, query, filterDomain]);

  const openCreate = () => { setForm(emptyForm()); setModal('create'); };
  const openEdit = (c: Certificate) => {
    setSelected(c);
    setForm({ studentName: c.studentName, internship: c.internship, domain: c.domain, role: c.role, startDate: c.startDate, endDate: c.endDate, issueDate: c.issueDate, skills: [...c.skills], status: c.status, email: c.email ?? '', certificatePdfUrl: c.certificatePdfUrl ?? '', certificateImageUrl: c.certificateImageUrl ?? '' });
    setModal('edit');
  };
  const openView = (c: Certificate) => { setSelected(c); setModal('view'); };
  const openQR = (c: Certificate) => { setSelected(c); setModal('qr'); };
  const openDelete = (c: Certificate) => { setSelected(c); setModal('delete'); };
  const closeModal = () => { setModal('none'); setSelected(null); setSkillInput(''); };

  const handleDomainChange = (domain: string) => {
    setForm(f => ({
      ...f,
      domain,
      role: ROLES_BY_DOMAIN[domain]?.[0] ?? '',
      internship: `${domain} Internship`,
      skills: [...(SKILLS_BY_DOMAIN[domain] ?? [])].slice(0, 5),
    }));
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      setForm(f => ({ ...f, skills: [...f.skills, s] }));
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }));
  };

  const handleSave = async () => {
    if (!form.studentName || !form.domain || !form.role) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    if (modal === 'create') {
      const cert = db.create(form);
      toast.success(`Certificate ${cert.id} created successfully!`);
    } else if (modal === 'edit' && selected) {
      db.update(selected.id, form);
      toast.success('Certificate updated successfully!');
    }
    load();
    setSaving(false);
    closeModal();
  };

  const handleDelete = () => {
    if (!selected) return;
    db.delete(selected.id);
    toast.success(`Certificate ${selected.id} deleted.`);
    load();
    closeModal();
  };

  const handleLogout = () => {
    db.adminLogout();
    navigate('/admin');
    toast.info('Logged out.');
  };

  const statsData = [
    { icon: <Users className="w-5 h-5" />, label: 'Total Certificates', value: certs.length, color: 'text-neon-blue' },
    { icon: <ShieldCheck className="w-5 h-5" />, label: 'Verified', value: certs.filter(c => c.status === 'VERIFIED').length, color: 'text-neon-green' },
    { icon: <Award className="w-5 h-5" />, label: 'Domains', value: new Set(certs.map(c => c.domain)).size, color: 'text-neon-gold' },
    { icon: <Calendar className="w-5 h-5" />, label: '2026 Cohort', value: certs.filter(c => c.id.includes('2026')).length, color: 'text-brand-300' },
  ];

  return (
    <div className="min-h-screen bg-hero-gradient">
      {/* Header */}
      <div className="bg-brand-900/80 backdrop-blur border-b border-glass-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-display font-bold text-white">Admin Dashboard</h1>
            <p className="text-xs text-brand-400">Maxim Code Certificate Management</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={openCreate} className="neon-btn !px-4 !py-2 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Certificate
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg text-brand-300 hover:text-white hover:bg-brand-800 text-sm transition-all">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map(s => (
            <div key={s.label} className="glass-card p-4 flex items-center gap-3">
              <div className={`${s.color}`}>{s.icon}</div>
              <div>
                <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-brand-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, ID, domain…"
              className="input-field pl-10 py-2.5 text-sm"
            />
          </div>
          <div className="relative sm:w-56">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
            <select
              value={filterDomain}
              onChange={e => setFilterDomain(e.target.value)}
              className="input-field pl-10 py-2.5 text-sm appearance-none cursor-pointer"
            >
              <option value="">All Domains</option>
              {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-glass-border text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wider">Certificate ID</th>
                  <th className="px-4 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wider">Student</th>
                  <th className="px-4 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wider hidden md:table-cell">Domain</th>
                  <th className="px-4 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wider hidden lg:table-cell">Issue Date</th>
                  <th className="px-4 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-brand-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-brand-400">
                      {query || filterDomain ? 'No certificates match your search.' : 'No certificates yet.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map(cert => (
                    <tr key={cert.id} className="hover:bg-brand-800/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-neon-blue font-medium text-xs">{cert.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{cert.studentName}</p>
                        <p className="text-xs text-brand-400 md:hidden">{cert.domain}</p>
                      </td>
                      <td className="px-4 py-3 text-brand-300 hidden md:table-cell">{cert.domain}</td>
                      <td className="px-4 py-3 text-brand-300 hidden lg:table-cell">{formatDate(cert.issueDate)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          cert.status === 'VERIFIED' ? 'bg-neon-green/10 text-neon-green border border-neon-green/20' :
                          cert.status === 'REVOKED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {cert.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <IconBtn onClick={() => openView(cert)} title="View"><Eye className="w-4 h-4" /></IconBtn>
                          <IconBtn onClick={() => openQR(cert)} title="QR Code"><RefreshCw className="w-4 h-4" /></IconBtn>
                          <IconBtn onClick={() => openEdit(cert)} title="Edit"><Edit2 className="w-4 h-4" /></IconBtn>
                          <IconBtn onClick={() => openDelete(cert)} title="Delete" danger><Trash2 className="w-4 h-4" /></IconBtn>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Modals ──────────────────────────────────────────── */}

      {/* View Modal */}
      {modal === 'view' && selected && (
        <Modal onClose={closeModal} title="Certificate Details" wide>
          <CertificateCard certificate={selected} />
        </Modal>
      )}

      {/* QR Modal */}
      {modal === 'qr' && selected && (
        <Modal onClose={closeModal} title="QR Code">
          <div className="text-center">
            <p className="text-sm text-brand-300 mb-5">QR code for <span className="font-mono text-neon-blue">{selected.id}</span></p>
            <QRCodeDisplay value={selected.qrUrl} certificateId={selected.id} size={200} />
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {modal === 'delete' && selected && (
        <Modal onClose={closeModal} title="Delete Certificate">
          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-900/30 border-2 border-red-500/40 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7 text-red-400" />
            </div>
            <p className="text-white">Are you sure you want to delete certificate</p>
            <p className="font-mono text-neon-blue text-lg">{selected.id}</p>
            <p className="text-brand-400 text-sm">for <strong className="text-white">{selected.studentName}</strong>?</p>
            <p className="text-red-400 text-xs">This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-2.5 rounded-xl border border-brand-600 text-brand-200 hover:bg-brand-800 transition-all text-sm font-medium">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create / Edit Modal */}
      {(modal === 'create' || modal === 'edit') && (
        <Modal onClose={closeModal} title={modal === 'create' ? 'Generate New Certificate' : `Edit ${selected?.id}`} wide>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Student Name *">
                <input value={form.studentName} onChange={e => setForm(f => ({ ...f, studentName: e.target.value }))} className="input-field py-2.5 text-sm" placeholder="Full name" />
              </Field>
              <Field label="Email">
                <input value={form.email ?? ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field py-2.5 text-sm" placeholder="student@email.com" type="email" />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Domain *">
                <select value={form.domain} onChange={e => handleDomainChange(e.target.value)} className="input-field py-2.5 text-sm appearance-none cursor-pointer">
                  {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Role *">
                <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="input-field py-2.5 text-sm appearance-none cursor-pointer">
                  {(ROLES_BY_DOMAIN[form.domain] ?? []).map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Internship Title">
              <input value={form.internship} onChange={e => setForm(f => ({ ...f, internship: e.target.value }))} className="input-field py-2.5 text-sm" placeholder="e.g. Web Development Internship" />
            </Field>

            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Start Date">
                <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} className="input-field py-2.5 text-sm" />
              </Field>
              <Field label="End Date">
                <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} className="input-field py-2.5 text-sm" />
              </Field>
              <Field label="Issue Date">
                <input type="date" value={form.issueDate} onChange={e => setForm(f => ({ ...f, issueDate: e.target.value }))} className="input-field py-2.5 text-sm" />
              </Field>
            </div>

            <Field label="Status">
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Certificate['status'] }))} className="input-field py-2.5 text-sm appearance-none cursor-pointer">
                <option value="VERIFIED">VERIFIED</option>
                <option value="PENDING">PENDING</option>
                <option value="REVOKED">REVOKED</option>
              </select>
            </Field>

            {/* Skills */}
            <Field label="Skills">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                    className="input-field py-2 text-sm flex-1"
                    placeholder="Type skill and press Enter"
                  />
                  <button type="button" onClick={addSkill} className="px-4 py-2 bg-brand-700 hover:bg-brand-600 text-white rounded-xl text-sm font-medium transition-all">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.skills.map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1 bg-brand-700 rounded-full text-xs text-white">
                      {s}
                      <button onClick={() => removeSkill(s)} className="text-brand-400 hover:text-white transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </Field>

            <div className="flex gap-3 pt-2">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-brand-600 text-brand-200 hover:bg-brand-800 transition-all text-sm font-medium">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 neon-btn flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {modal === 'create' ? 'Generate Certificate' : 'Save Changes'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function Modal({
  children,
  onClose,
  title,
  wide = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`glass-card-heavy w-full ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto animate-scale-in`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-glass-border">
          <h2 className="font-display font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-brand-400 hover:text-white hover:bg-brand-700 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-brand-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  danger = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-all ${
        danger
          ? 'text-brand-400 hover:text-red-400 hover:bg-red-500/10'
          : 'text-brand-400 hover:text-white hover:bg-brand-700'
      }`}
    >
      {children}
    </button>
  );
}
