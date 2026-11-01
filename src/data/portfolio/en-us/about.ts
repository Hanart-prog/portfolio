import { commonAbout } from '@/data/portfolio/common/about';
import type { About } from '@/types/portfolio/about/about';

export const about: About = {
  ...commonAbout,
  identity: { ...commonAbout.identity, role: 'Software Engineer' },
  introduction: {
    tagline:
      "I build full stack products and the cloud infrastructure behind them. I'm an engineer who loves to learn and loves to code.",
    summary:
      'Computer Science student at Ohio State and two-time GoDaddy intern building full stack products and cloud infrastructure.',
    biography:
      "I'm a Computer Science student at The Ohio State University, minoring in Information Security. I've interned at GoDaddy twice and worked as a machine learning research assistant on campus. I'm also Chapter Vice President of Minorities in Tech, where I help students land their first internships. I have an odd favorite part of engineering: the moment before you ship. Most of what I build outside of class exists to answer one question, what breaks if I change this?",
  },
  cv: `${import.meta.env.BASE_URL}Hanat_Sharif_Resume.pdf`,
  education: [
    {
      institution: 'The Ohio State University',
      degree:
        'Bachelor of Science in Computer Science, Minor in Information Security · GPA 3.7',
      period: 'Expected May 2028',
      endDate: '2028-05',
    },
  ],
};

export default about;
