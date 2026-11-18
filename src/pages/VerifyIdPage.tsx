import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import VerificationDisplay from '@/components/features/VerificationDisplay';

/**
 * /verify/:id — QR code landing page.
 * Reads the certificate ID from the URL, passes it to VerificationDisplay
 * with autoSubmit=true so verification starts immediately.
 */
export default function VerifyIdPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const decodedId = decodeURIComponent(id ?? '').toUpperCase();

  return (
    <div className="min-h-screen bg-hero-gradient py-10 px-4 sm:px-6 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/verify')}
          className="no-print mb-6 flex items-center gap-2 text-sm text-brand-300 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Verification
        </button>

        {/* Page title (visible while loading so page doesn't feel blank) */}
        <div className="text-center mb-8 no-print animate-fade-in">
          <h1 className="text-2xl font-display font-semibold text-white">
            Certificate Verification
          </h1>
          {decodedId && (
            <p className="text-brand-400 text-sm mt-1 font-mono">{decodedId}</p>
          )}
        </div>

        {/* Verification widget — auto-submits on mount */}
        <VerificationDisplay
          initialId={decodedId}
          autoSubmit={true}
        />
      </div>
    </div>
  );
}
