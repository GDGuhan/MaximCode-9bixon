import { Certificate } from '@/types/certificate';
import { formatDate } from '@/lib/utils';
import { ShieldCheck, Calendar, Award, User, Briefcase, Star } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
  compact?: boolean;
}

const DOMAIN_COLORS: Record<string, string> = {
  'Web Development':       'from-blue-600 to-cyan-500',
  'App Development':       'from-purple-600 to-pink-500',
  'AI & Machine Learning': 'from-orange-600 to-amber-500',
  'Data Science':          'from-emerald-600 to-teal-500',
  'Digital Marketing':     'from-rose-600 to-pink-500',
  'Affiliate Marketing':   'from-yellow-600 to-orange-500',
};

export default function CertificateCard({ certificate, compact = false }: CertificateCardProps) {
  const domainGrad = DOMAIN_COLORS[certificate.domain] ?? 'from-brand-600 to-brand-400';

  if (compact) {
    return (
      <div className="glass-card p-4 flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${domainGrad} flex items-center justify-center flex-shrink-0`}>
          <Award className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-white truncate">{certificate.studentName}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green font-medium border border-neon-green/20">
              {certificate.status}
            </span>
          </div>
          <p className="text-sm text-brand-300 truncate">{certificate.domain} · {certificate.role}</p>
          <p className="text-xs text-brand-400 mt-0.5">{certificate.id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card-heavy overflow-hidden animate-scale-in">
      {/* Certificate Header */}
      <div className={`bg-gradient-to-r ${domainGrad} p-6 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
          }}
        />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-white/70 uppercase tracking-widest">MAXIM CODE</p>
              <p className="font-display font-bold text-white text-lg">Certificate of Completion</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/70 uppercase tracking-widest">Certificate ID</p>
            <p className="font-mono font-bold text-white text-lg">{certificate.id}</p>
          </div>
        </div>
      </div>

      {/* Certificate Body */}
      <div className="p-6 space-y-5">
        {/* Student Info */}
        <div className="text-center border-b border-glass-border pb-5">
          <p className="text-sm text-brand-300 mb-1">This certifies that</p>
          <h2 className="text-3xl font-display font-bold text-white mb-1">{certificate.studentName}</h2>
          <p className="text-brand-300">has successfully completed the</p>
          <p className="text-xl font-semibold text-neon-blue mt-1">{certificate.internship}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <InfoCell icon={<Briefcase className="w-4 h-4" />} label="Domain" value={certificate.domain} />
          <InfoCell icon={<User className="w-4 h-4" />} label="Role" value={certificate.role} />
          <InfoCell icon={<Calendar className="w-4 h-4" />} label="Issue Date" value={formatDate(certificate.issueDate)} />
          <InfoCell icon={<Calendar className="w-4 h-4" />} label="Start Date" value={formatDate(certificate.startDate)} />
          <InfoCell icon={<Calendar className="w-4 h-4" />} label="End Date" value={formatDate(certificate.endDate)} />
          <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neon-green flex-shrink-0" />
            <div>
              <p className="text-xs text-brand-400">Status</p>
              <p className="text-sm font-bold text-neon-green">{certificate.status}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        {certificate.skills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-neon-gold" />
              <p className="text-sm font-semibold text-white">Skills Acquired</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-brand-700 text-brand-100 border border-brand-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-glass-border text-xs text-brand-400">
          <span>Maxim Code Pvt. Ltd.</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-neon-green" />
            Blockchain Verified
          </span>
        </div>
      </div>
    </div>
  );
}

function InfoCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-brand-800/50 rounded-xl p-3 flex items-start gap-2">
      <span className="text-brand-300 mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-brand-400">{label}</p>
        <p className="text-sm font-medium text-white leading-tight break-words">{value}</p>
      </div>
    </div>
  );
}
