import { ShieldCheck } from 'lucide-react';
import VerificationDisplay from '@/components/features/VerificationDisplay';

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4 py-16 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-neon-gradient flex items-center justify-center mx-auto mb-5 shadow-neon-blue">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Verify Certificate
          </h1>
          <p className="text-brand-300">
            Enter a Certificate ID or scan the QR code to confirm authenticity
          </p>
        </div>

        {/* Unified verification widget */}
        <div className="glass-card-heavy p-8 animate-slide-up">
          <VerificationDisplay />
        </div>

        <p className="mt-4 text-center text-xs text-brand-500">
          Certificate IDs follow the format{' '}
          <span className="font-mono text-brand-300">MC-YYYY-NNNN</span>
        </p>
      </div>
    </div>
  );
}
