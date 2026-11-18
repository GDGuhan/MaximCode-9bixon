import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-900 border-t border-glass-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-neon-gradient flex items-center justify-center shadow-neon-blue">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">MAXIM CODE</span>
            </div>
            <p className="text-brand-300 text-sm leading-relaxed">
              Building the next generation of tech innovators through real-world internship experiences.
            </p>
            <div className="mt-4 space-y-2">
              <a href="mailto:hello@maximcode.dev" className="flex items-center gap-2 text-sm text-brand-300 hover:text-neon-blue transition-colors">
                <Mail className="w-4 h-4" /> hello@maximcode.dev
              </a>
              <a href="https://www.maximcode.dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-brand-300 hover:text-neon-blue transition-colors">
                <Globe className="w-4 h-4" /> www.maximcode.dev
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Verify Certificate', to: '/verify' },
                { label: 'Admin Dashboard', to: '/admin' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-brand-300 hover:text-neon-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-white mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-brand-300">
              {['Web Development', 'App Development', 'AI & Machine Learning', 'Data Science', 'Digital Marketing'].map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-brand-400">© 2026 Maxim Code Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1 text-sm text-brand-400">
            <ShieldCheck className="w-4 h-4 text-neon-green" />
            <span>Certificate Verification Powered by Maxim Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
