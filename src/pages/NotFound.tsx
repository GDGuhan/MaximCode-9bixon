import { useNavigate } from 'react-router-dom';
import { ShieldX, Home, Search } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-scale-in">
        <div className="w-24 h-24 rounded-full bg-brand-800 border-2 border-brand-600 flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-12 h-12 text-brand-400" />
        </div>
        <h1 className="text-6xl font-display font-black neon-text mb-3">404</h1>
        <h2 className="text-2xl font-display font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-brand-300 mb-8">
          The page you are looking for does not exist. If you scanned a QR code, please ensure the Certificate ID in the URL is correct.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/')} className="neon-btn flex items-center gap-2 justify-center">
            <Home className="w-4 h-4" /> Go Home
          </button>
          <button onClick={() => navigate('/verify')} className="px-6 py-3 rounded-xl border border-brand-600 text-brand-200 hover:bg-brand-800 hover:text-white transition-all font-semibold flex items-center gap-2 justify-center">
            <Search className="w-4 h-4" /> Verify Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
