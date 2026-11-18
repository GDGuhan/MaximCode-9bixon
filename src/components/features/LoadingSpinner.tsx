interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ message = 'Verifying certificate…', size = 'md' }: LoadingSpinnerProps) {
  const ring = size === 'sm' ? 'w-8 h-8 border-2' : size === 'lg' ? 'w-20 h-20 border-4' : 'w-14 h-14 border-[3px]';
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="relative">
        <div className={`${ring} border-brand-700 border-t-neon-blue rounded-full animate-spin`} />
        <div className={`absolute inset-2 border-[2px] border-brand-800 border-b-brand-500 rounded-full animate-spin-slow`} />
      </div>
      <p className="text-brand-300 text-sm font-medium animate-pulse">{message}</p>
    </div>
  );
}
