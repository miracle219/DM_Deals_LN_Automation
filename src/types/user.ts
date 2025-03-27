export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  company: string | null;
  sellingProducts: string | null;
  avgDealSize: string | null;
  role: 'ADMIN' | 'CUSTOMER' | 'B2B_FOUNDER' | 'B2B_SALESPERSON' | 'B2B_CREATOR' | 'B2B_MARKETER' | 'ENTREPRENEUR' | 'PROFESSIONAL' | 'JOB_SEEKER' | 'STUDENT' | 'OTHER' | null;
  referralSource: 'FRIEND_COWORKER' | 'WEB_SEARCH' | 'LINKEDIN' | 'TWITTER_X' | 'INSTAGRAM' | 'YOUTUBE' | 'OTHER' | null;
  linkedinAccessToken: string | null;
  linkedinRefreshToken: string | null;
  linkedinTokenExpiry: Date | string | null;
  apiTokens: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FormattedUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  company: string;
  sellingProducts: string;
  avgDealSize: string;
  createdAt: string;
}
export interface TargetProfile {
  id: string;
  person: string;
  company: string;
  title: string;
  yearlyProfit: string;
  added: string;
  connections: number;
  viewed: {
    name: string;
    date: string;
  } | null;
  replied: {
    name: string;
    date: string;
  } | null;
  liked: {
    name: string;
    date: string;
  } | null;
  recommendation: {
    type: string;
    platform: string;
    date: string;
    platforms: string[];
  } | null;
  selected: boolean;
}