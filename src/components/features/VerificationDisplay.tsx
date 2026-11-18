import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ShieldCheck, ShieldX, RefreshCw, Download,
  Printer, Share2, Info, QrCode, ArrowRight,
} from 'lucide-react';
import { db } from '@/lib/database';
import { Certificate } from '@/types/certificate';
import { sleep } from '@/lib/utils';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/features/LoadingSpinner';
import CertificateCard from '@/components/features/CertificateCard';
import VerifiedBadge from '@/components/features/VerifiedBadge';
import QRCodeDisplay from '@/components/features/QRCodeDisplay';
import ConfettiEffect from '@/components/features/ConfettiEffect';

type VerifyState = 'idle' | 'loading' | 'success' | 'not_found';

interface VerificationDisplayProps {
  /** Pre-fill the input and run verification automatically */
  initialId?: string;
  autoSubmit?: boolean;
}

export default function VerificationDisplay({
  initialId = '',
  autoSubmit = false,
}: VerificationDisplayProps) {
  const [certId, setCertId]       = useState(initialId);
  const [inputError, setInputError] = useState('');
  const [state, setState]         = useState<VerifyState>(autoSubmit && initialId ? 'loading' : 'idle');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [confetti, setConfetti]   = useState(false);
  const navigate                  = useNavigate();

  // ── Core verification logic ───────────────────────────────────────────────
  const executeVerify = useCallback(async (id: string) => {
    const cleanId = id.trim().toUpperCase();
    if (!cleanId) { setInputError('Please enter a Certificate ID.'); return; }
    if (!cleanId.startsWith('MC-')) {
      setInputError('Certificate IDs start with MC-  e.g. MC-2026-0001');
      return;
    }
    setInputError('');
    setState('loading');
    setConfetti(false);
    setCertificate(null);

    await sleep(1400);

    const cert = db.verify(cleanId);
    if (cert) {
      setCertificate(cert);
      setState('success');
      setTimeout(() => setConfetti(true), 150);
    } else {
      setState('not_found');
    }
  }, []);

  // Auto-submit when component mounts with an initialId
  useEffect(() => {
    if (autoSubmit && initialId) {
      executeVerify(initialId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeVerify(certId);
  };

  const handleReset = () => {
    setState('idle');
    setCertificate(null);
    setConfetti(false);
    setInputError('');
    if (autoSubmit) {
      // On a dedicated /verify/:id page, go back to manual search
      navigate('/verify');
    } else {
      setCertId('');
    }
  };

  const handlePrint = () => window.print();

  const handleShare = () => {
    const url = certificate
      ? `${window.location.origin}/verify/${certificate.id}`
      : window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Maxim Code Certificate Verification', url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Verification link copied!');
    }
  };

  const handleDownloadPDF = () => {
    toast.info('Opening print dialog for PDF export…');
    setTimeout(() => window.print(), 300);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      <ConfettiEffect trigger={confetti} />

      {/* ── Search Form (always visible unless auto-submit in loading/success state) ── */}
      {(state === 'idle' || !autoSubmit) && (
        <div className={`transition-all duration-500 ${state !== 'idle' ? 'mb-6' : ''}`}>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-200 mb-2">
                Certificate ID
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400 pointer-events-none" />
                  <input
                    type="text"
                    value={certId}
                    onChange={e => { setCertId(e.target.value); setInputError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleFormSubmit(e as unknown as React.FormEvent)}
                    placeholder="MC-2026-0001"
                    className="input-field pl-11 font-mono tracking-wider"
                    autoFocus={!autoSubmit}
                    aria-label="Certificate ID"
                  />
                </div>
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="neon-btn flex items-center gap-2 !px-5 !py-3 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {state === 'loading' ? (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">Verify</span>
                </button>
              </div>
              {inputError && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5 animate-fade-in">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  {inputError}
                </p>
              )}
            </div>
          </form>

          {/* Divider */}
          {state === 'idle' && (
            <>
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-glass-border" />
                <span className="text-xs text-brand-400">OR</span>
                <div className="flex-1 h-px bg-glass-border" />
              </div>

              {/* QR scan hint */}
              <div className="glass-card p-4 flex items-start gap-3">
                <QrCode className="w-6 h-6 text-neon-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Scan QR Code</p>
                  <p className="text-xs text-brand-300 mt-0.5">
                    Point your phone camera at the QR code on the certificate. You'll be
                    redirected here with the ID pre-filled and verified instantly.
                  </p>
                </div>
              </div>

              {/* Sample IDs */}
              <div className="mt-5">
                <p className="text-xs text-brand-400 mb-2">Try sample certificates:</p>
                <div className="flex flex-wrap gap-2">
                  {['MC-2026-0001', 'MC-2026-0002', 'MC-2026-0003', 'MC-2026-0004', 'MC-2026-0005'].map(id => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { setCertId(id); setInputError(''); }}
                      className="px-3 py-1.5 rounded-lg bg-brand-800 hover:bg-brand-700 text-brand-200 hover:text-white text-xs font-mono transition-all hover:scale-105"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Loading State ─────────────────────────────────────────────────── */}
      {state === 'loading' && (
        <div className="animate-fade-in glass-card-heavy p-10 text-center">
          <LoadingSpinner message="Fetching certificate from secure database…" size="lg" />
          <p className="text-xs text-brand-400 mt-1 font-mono">
            {certId.trim().toUpperCase() || initialId.toUpperCase()}
          </p>
        </div>
      )}

      {/* ── Not Found State ───────────────────────────────────────────────── */}
      {state === 'not_found' && (
        <div className="animate-scale-in glass-card-heavy p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-900/30 border-2 border-red-500/40 flex items-center justify-center mx-auto mb-5">
            <ShieldX className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-red-400 mb-2">Certificate Not Found</h2>
          <p className="text-brand-300 mb-2 text-sm">No record found for:</p>
          <p className="font-mono text-white bg-brand-800 rounded-xl px-4 py-2 mb-5 inline-block text-sm">
            {certId.trim().toUpperCase() || initialId.toUpperCase()}
          </p>
          <p className="text-sm text-brand-400 mb-7 max-w-sm mx-auto">
            This ID is invalid or does not exist. If you believe this is an error, contact{' '}
            <a href="mailto:hello@maximcode.dev" className="text-neon-blue hover:underline">
              hello@maximcode.dev
            </a>
          </p>
          <button
            onClick={handleReset}
            className="neon-btn flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Verify Another Certificate
          </button>
        </div>
      )}

      {/* ── Success State ─────────────────────────────────────────────────── */}
      {state === 'success' && certificate && (
        <div className="space-y-5 animate-fade-in">
          {/* Verified banner */}
          <div className="glass-card-heavy p-6 text-center border border-neon-green/20 no-print">
            <VerifiedBadge animate />
          </div>

          {/* Certificate card */}
          <CertificateCard certificate={certificate} />

          {/* QR + Actions */}
          <div className="grid md:grid-cols-2 gap-5 no-print">
            <div className="glass-card p-6 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-white mb-4 self-start">Certificate QR Code</h3>
              <QRCodeDisplay
                value={certificate.qrUrl}
                certificateId={certificate.id}
                size={160}
              />
            </div>

            <div className="glass-card p-6 flex flex-col gap-2.5">
              <h3 className="text-sm font-semibold text-white mb-2">Actions</h3>
              <ActionBtn icon={<Download className="w-4 h-4" />} label="Download Certificate PDF" onClick={handleDownloadPDF} primary />
              <ActionBtn icon={<Printer className="w-4 h-4" />} label="Print Certificate" onClick={handlePrint} />
              <ActionBtn icon={<Share2 className="w-4 h-4" />} label="Share Verification Link" onClick={handleShare} />
              <button
                onClick={handleReset}
                className="mt-1 w-full px-4 py-2.5 rounded-xl border border-brand-600 text-brand-300 hover:bg-brand-800 hover:text-white text-sm font-medium transition-all flex items-center gap-2 justify-center"
              >
                <ArrowRight className="w-4 h-4" />
                Verify Another Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Action button sub-component ─────────────────────────────────────────────
function ActionBtn({
  icon,
  label,
  onClick,
  primary = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 ${
        primary
          ? 'neon-btn !py-2.5 justify-center'
          : 'bg-brand-800 hover:bg-brand-700 text-brand-200 hover:text-white border border-brand-600'
      }`}
    >
      {icon} {label}
    </button>
  );
}
