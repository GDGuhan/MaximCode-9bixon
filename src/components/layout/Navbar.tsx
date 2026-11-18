import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, Settings } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Verify Certificate', to: '/verify' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-brand-950/80 backdrop-blur-xl border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-neon-gradient flex items-center justify-center shadow-neon-blue group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-white text-lg leading-none">MAXIM CODE</span>
              <p className="text-xs text-brand-300 leading-none">Internship Program</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.to
                    ? 'bg-brand-700 text-neon-blue'
                    : 'text-brand-200 hover:bg-brand-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => navigate('/admin')}
              className="ml-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-brand-300 hover:text-white hover:bg-brand-800 transition-all"
            >
              <Settings className="w-4 h-4" />
              Admin
            </button>
            <Link
              to="/verify"
              className="ml-2 neon-btn !px-5 !py-2 text-sm"
            >
              Verify Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-brand-300 hover:text-white hover:bg-brand-800 transition-all"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-1 animate-slide-down">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.to
                    ? 'bg-brand-700 text-neon-blue'
                    : 'text-brand-200 hover:bg-brand-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-brand-300 hover:bg-brand-800 hover:text-white transition-all"
            >
              Admin Dashboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
