import type { TechStackItem } from '../tech-stack/tech-stack-item';

export interface Project {
  name: string;
  description: string;
  images: string[];
  techStack: TechStackItem[];
  website: string;
}
