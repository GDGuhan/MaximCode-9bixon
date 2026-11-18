export const DOMAINS = [
  'Web Development',
  'App Development',
  'AI & Machine Learning',
  'Data Science',
  'Digital Marketing',
  'Affiliate Marketing',
];

export const ROLES_BY_DOMAIN: Record<string, string[]> = {
  'Web Development':       ['Frontend Developer Intern', 'Backend Developer Intern', 'Full-Stack Developer Intern'],
  'App Development':       ['Flutter Developer Intern', 'React Native Developer Intern', 'Mobile UI/UX Intern'],
  'AI & Machine Learning': ['AI/ML Engineer Intern', 'NLP Research Intern', 'Computer Vision Intern'],
  'Data Science':          ['Data Analyst Intern', 'Data Science Intern', 'BI Analyst Intern'],
  'Digital Marketing':     ['Digital Marketing Intern', 'SEO Specialist Intern', 'Social Media Intern'],
  'Affiliate Marketing':   ['Affiliate Marketing Intern', 'Content Marketing Intern', 'Growth Hacker Intern'],
};

export const SKILLS_BY_DOMAIN: Record<string, string[]> = {
  'Web Development':       ['React', 'Node.js', 'Tailwind CSS', 'MongoDB', 'REST APIs', 'TypeScript', 'Next.js'],
  'App Development':       ['Flutter', 'Dart', 'Firebase', 'REST API', 'UI/UX', 'SQLite', 'GetX'],
  'AI & Machine Learning': ['Python', 'TensorFlow', 'OpenAI API', 'LangChain', 'NLP', 'PyTorch', 'Scikit-learn'],
  'Data Science':          ['Python', 'Pandas', 'SQL', 'Tableau', 'Scikit-learn', 'Matplotlib', 'Power BI'],
  'Digital Marketing':     ['SEO', 'Google Ads', 'Analytics', 'Meta Ads', 'Content Strategy', 'Email Marketing'],
  'Affiliate Marketing':   ['Funnel Building', 'Copywriting', 'CRO', 'Email Marketing', 'Paid Traffic', 'Analytics'],
};

export const BASE_VERIFY_URL = 'https://maximcode.vercel.app/verify';
export const ADMIN_PASSWORD_HINT = 'MaximAdmin2026';
