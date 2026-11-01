import experienceImage from '@/assets/experience/cover.jpg';
import godaddyLogo from '@/assets/logos/godaddy.svg';
import minoritiesInTechLogo from '@/assets/logos/minorities-in-tech.png';
import ohioStateLogo from '@/assets/logos/ohio-state.svg';
import { techStacks } from '@/constants/tech-stacks';
import type { Trajectory } from '@/types/portfolio/trajectory/trajectory';

const items: Trajectory['items'] = [
  {
    name: 'GoDaddy · Performance Marketing Team',
    logo: godaddyLogo,
    position: 'Software Engineer Intern',
    startDate: '2026-05',
    endDate: '2026-08',
    summary:
      'Cut AWS costs by $573k+ annually by migrating 10 Elasticsearch clusters to frozen storage, and led a Functionbeat to Data Firehose migration that lowered Lambda costs by 10%.',
    techStack: [techStacks.aws, techStacks.elasticsearch, techStacks.kibana],
  },
  {
    name: 'GoDaddy · Customer Engagement Team',
    logo: godaddyLogo,
    position: 'Software Development Engineer Intern',
    startDate: '2025-05',
    endDate: '2025-08',
    summary:
      'Engineered Luma, an internal email builder that replaced legacy Salesforce workflows and reached 90% adoption across 40+ marketers and engineers. Added real time A/B testing that increased subscription renewals by 12%.',
    techStack: [techStacks.react, techStacks.vite, techStacks.aws],
  },
  {
    name: 'The Ohio State University',
    logo: ohioStateLogo,
    position: 'Machine Learning Research Assistant',
    startDate: '2024-05',
    endDate: '2024-08',
    summary:
      'Developed machine learning models that predict pedestrian congestion from campus traffic data, supporting route planning for autonomous delivery robots.',
    techStack: [
      techStacks.python,
      techStacks.scikitLearn,
      techStacks.pandas,
      techStacks.numpy,
    ],
  },
  {
    name: 'Minorities in Tech at Ohio State',
    logo: minoritiesInTechLogo,
    position: 'Chapter Vice President',
    startDate: '2024-01',
    summary:
      'Organize 5-6 technical speaker events each semester, mentoring 200+ students, and lead interview prep cohorts and resume workshops.',
    techStack: [],
  },
];

export const trajectory: Trajectory = { image: experienceImage, items };

export default trajectory;
