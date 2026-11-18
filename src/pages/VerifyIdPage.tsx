import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldX, RefreshCw, Download, Printer, Share2, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/database';
import { Certificate } from '@/types/certificate';
import { sleep } from '@/lib/utils';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/features/LoadingSpinner';
import CertificateCard from '@/components/features/CertificateCard';
import VerifiedBadge from '@/components/features/VerifiedBadge';
import QRCodeDisplay from '@/components/features/QRCodeDisplay';
import ConfettiEffect from '@/components/features/ConfettiEffect';

type VerifyState = 'loading' | 'success' | 'not_found';

export default function VerifyIdPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<VerifyState>('loading');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [confetti, setConfetti] = useState(false);

  const verify = useCallback(async (certId: string) => {
    setState('loading');
    setConfetti(false);
    await sleep(1400); // realistic verification delay
    const cert = db.verify(certId);
    if (cert) {
      setCertificate(cert);
      setState('success');
      setTimeout(() => setConfetti(true), 200);
    } else {
      setState('not_found');
    }
  }, []);

  useEffect(() => {
    if (id) verify(id);
  }, [id, verify]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Maxim Code Certificate', url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Verification link copied to clipboard!');
    }
  };

  const handleDownloadPDF = () => {
    if (!certificate) return;
    toast.info('Opening print dialog for PDF export…');
    setTimeout(() => window.print(), 300);
  };

  const handleDownloadImg = (type: 'png' | 'jpg') => {
    toast.success(`Certificate downloaded as ${type.toUpperCase()} (feature uses print in V1)`);
    handlePrint();
  };

  return (
    <div className="min-h-screen bg-hero-gradient py-10 px-4 sm:px-6">
      <ConfettiEffect trigger={confetti} />

      {/* Back button */}
      <div className="max-w-4xl mx-auto mb-6 no-print">
        <button
          onClick={() => navigate('/verify')}
          className="flex items-center gap-2 text-sm text-brand-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Verification
        </button>
      </div>

      {/* Loading */}
      {state === 'loading' && (
        <div className="max-w-md mx-auto glass-card-heavy p-10 text-center animate-fade-in">
          <LoadingSpinner message="Fetching certificate from secure database…" size="lg" />
          <p className="text-xs text-brand-400 mt-2 font-mono">{id}</p>
        </div>
      )}

      {/* Not Found */}
      {state === 'not_found' && (
        <div className="max-w-md mx-auto animate-scale-in">
          <div className="glass-card-heavy p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-red-900/30 border-2 border-red-500/40 flex items-center justify-center mx-auto mb-5">
              <ShieldX className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-red-400 mb-2">Certificate Not Found</h2>
            <p className="text-brand-300 mb-2">
              No certificate found for ID:
            </p>
            <p className="font-mono text-white bg-brand-800 rounded-xl px-4 py-2 mb-6 inline-block text-sm">
              {id}
            </p>
            <p className="text-sm text-brand-400 mb-8">
              This certificate ID is invalid or does not exist in our records. If you believe this is an error, please contact{' '}
              <a href="mailto:hello@maximcode.dev" className="text-neon-blue hover:underline">
                hello@maximcode.dev
              </a>
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/verify')}
                className="w-full neon-btn flex items-center gap-2 justify-center"
              >
                <RefreshCw className="w-4 h-4" /> Verify Another Certificate
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full px-6 py-3 rounded-xl border border-brand-600 text-brand-200 hover:bg-brand-800 hover:text-white transition-all font-medium"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success */}
      {state === 'success' && certificate && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          {/* Verified Banner */}
          <div className="glass-card-heavy p-6 md:p-8 text-center border border-neon-green/20 no-print">
            <VerifiedBadge animate />
          </div>

          {/* Certificate Card */}
          <CertificateCard certificate={certificate} />

          {/* QR Code + Actions */}
          <div className="grid md:grid-cols-2 gap-5 no-print">
            {/* QR Code */}
            <div className="glass-card p-6 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-white mb-4 self-start">Certificate QR Code</h3>
              <QRCodeDisplay
                value={certificate.qrUrl}
                certificateId={certificate.id}
                size={160}
              />
            </div>

            {/* Action Buttons */}
            <div className="glass-card p-6 space-y-3">
              <h3 className="text-sm font-semibold text-white mb-4">Actions</h3>
              <ActionBtn
                icon={<Download className="w-4 h-4" />}
                label="Download Certificate PDF"
                onClick={handleDownloadPDF}
                primary
              />
              <ActionBtn
                icon={<Download className="w-4 h-4" />}
                label="Download Certificate PNG"
                onClick={() => handleDownloadImg('png')}
              />
              <ActionBtn
                icon={<Download className="w-4 h-4" />}
                label="Download Certificate JPG"
                onClick={() => handleDownloadImg('jpg')}
              />
              <ActionBtn
                icon={<Printer className="w-4 h-4" />}
                label="Print Certificate"
                onClick={handlePrint}
              />
              <ActionBtn
                icon={<Share2 className="w-4 h-4" />}
                label="Share Certificate"
                onClick={handleShare}
              />
              <button
                onClick={() => navigate('/verify')}
                className="w-full px-4 py-3 rounded-xl border border-brand-600 text-brand-300 hover:bg-brand-800 hover:text-white text-sm font-medium transition-all flex items-center gap-2 justify-center"
              >
                <RefreshCw className="w-4 h-4" /> Verify Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
      className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
        primary
          ? 'neon-btn !py-2.5 justify-center'
          : 'bg-brand-800 hover:bg-brand-700 text-brand-200 hover:text-white border border-brand-600'
      }`}
    >
      {icon} {label}
    </button>
  );
}
