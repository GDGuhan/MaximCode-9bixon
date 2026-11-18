import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Search, QrCode, Award, CheckCircle, ArrowRight, Users, Globe, Star, Zap } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const STATS = [
  { value: '500+', label: 'Interns Certified' },
  { value: '6',    label: 'Tech Domains' },
  { value: '100%', label: 'Verified Instantly' },
  { value: '2026', label: 'Cohort Open' },
];

const FEATURES = [
  {
    icon: <QrCode className="w-6 h-6" />,
    title: 'QR Scan Verification',
    desc: 'Scan any certificate QR code with your phone camera and instantly verify authenticity.',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Manual ID Lookup',
    desc: 'Enter a Certificate ID like MC-2026-0001 to instantly retrieve and verify the record.',
    color: 'from-purple-600 to-pink-500',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Tamper-Proof Records',
    desc: 'Every certificate is permanently stored with a unique ID — impossible to forge.',
    color: 'from-emerald-600 to-teal-500',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Global Recognition',
    desc: 'Maxim Code certificates are recognized by leading tech employers worldwide.',
    color: 'from-orange-600 to-amber-500',
  },
];

const DOMAINS = [
  { name: 'Web Development',       color: 'bg-blue-500/10 border-blue-500/30 text-blue-300' },
  { name: 'App Development',       color: 'bg-purple-500/10 border-purple-500/30 text-purple-300' },
  { name: 'AI & ML',               color: 'bg-orange-500/10 border-orange-500/30 text-orange-300' },
  { name: 'Data Science',          color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' },
  { name: 'Digital Marketing',     color: 'bg-rose-500/10 border-rose-500/30 text-rose-300' },
  { name: 'Affiliate Marketing',   color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300' },
];

export default function HomePage() {
  const [certId, setCertId] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const id = certId.trim().toUpperCase();
    if (id) navigate(`/verify/${encodeURIComponent(id)}`);
    else navigate('/verify');
  };

  return (
    <div className="overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-hero-gradient opacity-80" />
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(2,8,23,0.6) 70%)',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm font-medium mb-6 animate-fade-in">
            <ShieldCheck className="w-4 h-4" />
            2026 Certificate Verification System
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6 animate-slide-up">
            Verify Your{' '}
            <span className="neon-text">MAXIM CODE</span>
            <br />Certificate
          </h1>
          <p className="text-xl text-brand-200 max-w-2xl mx-auto mb-10 animate-slide-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
            Instantly verify the authenticity of any Maxim Code internship certificate. Scan the QR code or enter the Certificate ID.
          </p>

          {/* Verify Input */}
          <form onSubmit={handleVerify} className="max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex gap-3 glass-card p-2">
              <input
                type="text"
                value={certId}
                onChange={e => setCertId(e.target.value)}
                placeholder="Enter Certificate ID  e.g. MC-2026-0001"
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-brand-400 px-3 py-2 text-sm font-medium"
              />
              <button type="submit" className="neon-btn !px-6 !py-2.5 text-sm whitespace-nowrap flex items-center gap-2">
                <Search className="w-4 h-4" /> Verify
              </button>
            </div>
            <p className="mt-3 text-sm text-brand-400">
              Or{' '}
              <button type="button" onClick={() => navigate('/verify')} className="text-neon-blue hover:underline">
                open manual verification →
              </button>
            </p>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {STATS.map(s => (
              <div key={s.label} className="glass-card p-4 text-center">
                <p className="text-3xl font-display font-black neon-text">{s.value}</p>
                <p className="text-xs text-brand-300 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-neon-blue uppercase tracking-widest mb-2">Verification Process</p>
            <h2 className="section-title">How It Works</h2>
            <p className="text-brand-300 max-w-xl mx-auto">Three simple ways to verify any Maxim Code certificate in seconds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: <QrCode className="w-6 h-6" />, title: 'Scan QR Code', desc: 'Open your phone camera and scan the QR code printed on the certificate. It automatically opens the verification page.' },
              { step: '02', icon: <Search className="w-6 h-6" />, title: 'Enter Certificate ID', desc: 'Visit maximcode.vercel.app/verify and type the Certificate ID like MC-2026-0001 to look up instantly.' },
              { step: '03', icon: <CheckCircle className="w-6 h-6" />, title: 'View Result', desc: 'See student details, domain, skills, dates, and a VERIFIED badge with confetti animation.' },
            ].map((item, i) => (
              <div
                key={item.step}
                className="glass-card p-6 relative group hover:border-neon-blue/30 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute top-4 right-4 font-display font-black text-4xl text-brand-700 select-none">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-neon-gradient flex items-center justify-center mb-4 group-hover:shadow-neon-blue transition-shadow">
                  <span className="text-white">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-brand-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-brand-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-neon-blue uppercase tracking-widest mb-2">Platform Features</p>
            <h2 className="section-title">Why Trust Our Certificates?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="glass-card p-5 hover:border-neon-blue/20 transition-all duration-300 group">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-white">{f.icon}</span>
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-brand-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Domains ──────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-neon-blue uppercase tracking-widest mb-2">Certificate Tracks</p>
          <h2 className="section-title">Available Domains</h2>
          <p className="text-brand-300 mb-10">Certificates are issued for all 6 specialization tracks.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {DOMAINS.map(d => (
              <span key={d.name} className={`px-5 py-2.5 rounded-full border text-sm font-medium ${d.color}`}>
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center glass-card-heavy p-10 md:p-14">
          <div className="w-16 h-16 rounded-2xl bg-neon-gradient flex items-center justify-center mx-auto mb-6 shadow-neon-blue animate-float">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Verify a Certificate?
          </h2>
          <p className="text-brand-300 mb-8 text-lg">
            Enter any Certificate ID or scan the QR code to instantly verify authenticity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/verify')}
              className="neon-btn flex items-center gap-2 justify-center text-base"
            >
              <Search className="w-5 h-5" /> Verify Certificate
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="px-6 py-3 rounded-xl border border-brand-600 text-brand-200 hover:bg-brand-800 hover:text-white transition-all flex items-center gap-2 justify-center font-semibold"
            >
              <Zap className="w-5 h-5" /> Admin Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
