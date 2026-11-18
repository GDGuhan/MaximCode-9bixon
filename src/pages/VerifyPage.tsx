import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, QrCode, Info } from 'lucide-react';

export default function VerifyPage() {
  const [certId, setCertId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = certId.trim().toUpperCase();
    if (!id) { setError('Please enter a Certificate ID.'); return; }
    if (!id.startsWith('MC-')) { setError('Certificate IDs start with MC-  e.g. MC-2026-0001'); return; }
    setError('');
    navigate(`/verify/${encodeURIComponent(id)}`);
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-neon-gradient flex items-center justify-center mx-auto mb-5 shadow-neon-blue">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Verify Certificate</h1>
          <p className="text-brand-300">Enter a Certificate ID to verify its authenticity</p>
        </div>

        {/* Form Card */}
        <div className="glass-card-heavy p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-200 mb-2">
                Certificate ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
                <input
                  type="text"
                  value={certId}
                  onChange={e => { setCertId(e.target.value); setError(''); }}
                  placeholder="MC-2026-0001"
                  className="input-field pl-11 font-mono tracking-wider"
                  autoFocus
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4 flex-shrink-0" />{error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full neon-btn flex items-center justify-center gap-2 text-base py-3.5"
            >
              <ShieldCheck className="w-5 h-5" />
              Verify Certificate
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-glass-border" />
            <span className="text-xs text-brand-400">OR</span>
            <div className="flex-1 h-px bg-glass-border" />
          </div>

          {/* QR Scan hint */}
          <div className="glass-card p-4 flex items-start gap-3">
            <QrCode className="w-6 h-6 text-neon-blue flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">Scan QR Code</p>
              <p className="text-xs text-brand-300 mt-0.5">
                Open your phone camera and scan the QR code on the certificate. It will automatically redirect to this page with the Certificate ID pre-filled.
              </p>
            </div>
          </div>

          {/* Sample IDs */}
          <div className="mt-5">
            <p className="text-xs text-brand-400 mb-2">Try these sample certificates:</p>
            <div className="flex flex-wrap gap-2">
              {['MC-2026-0001', 'MC-2026-0002', 'MC-2026-0003'].map(id => (
                <button
                  key={id}
                  onClick={() => setCertId(id)}
                  className="px-3 py-1.5 rounded-lg bg-brand-800 hover:bg-brand-700 text-brand-200 hover:text-white text-xs font-mono transition-all"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Format note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-brand-500">
            Certificate IDs follow the format <span className="font-mono text-brand-300">MC-YYYY-NNNN</span>
          </p>
        </div>
      </div>
    </div>
  );
}
