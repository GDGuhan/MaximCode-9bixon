export interface Certificate {
  id: string;                 // MC-2026-0001
  studentName: string;
  internship: string;
  domain: string;
  role: string;
  startDate: string;          // ISO date string
  endDate: string;
  issueDate: string;
  skills: string[];
  status: 'VERIFIED' | 'REVOKED' | 'PENDING';
  qrUrl: string;              // https://maximcode.vercel.app/verify/{id}
  certificatePdfUrl?: string;
  certificateImageUrl?: string;
  email?: string;
  createdAt: string;          // ISO timestamp
}

export interface VerifyResponse {
  verified: boolean;
  data?: Certificate;
  error?: string;
}

export interface AdminCredentials {
  password: string;
}
