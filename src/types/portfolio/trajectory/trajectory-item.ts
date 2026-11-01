import type { TechStackItem } from '../tech-stack/tech-stack-item';

export interface TrajectoryItem {
  name: string;
  logo: string;
  position: string;
  startDate: string;
  endDate?: string;
  summary: string;
  techStack: TechStackItem[];
}
