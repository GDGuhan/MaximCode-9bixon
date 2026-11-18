import verifiedBadgeImg from '@/assets/verified-badge.png';

interface VerifiedBadgeProps {
  animate?: boolean;
}

export default function VerifiedBadge({ animate = true }: VerifiedBadgeProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${animate ? 'animate-bounce-in' : ''}`}>
      <div className="relative">
        <div className="w-24 h-24 rounded-full verified-ring flex items-center justify-center bg-emerald-900/30 border-2 border-neon-green/60">
          <img src={verifiedBadgeImg} alt="Verified" className="w-16 h-16 object-contain" />
        </div>
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-neon-green/30 animate-ping" />
      </div>
      <div className="text-center">
        <p className="text-2xl font-display font-bold text-neon-green">✓ VERIFIED</p>
        <p className="text-sm text-brand-300 mt-0.5">Certificate is Authentic & Valid</p>
      </div>
    </div>
  );
}
