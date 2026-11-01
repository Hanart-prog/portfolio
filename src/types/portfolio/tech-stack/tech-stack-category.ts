import type { LucideIcon } from 'lucide-react';
import type { TechStackItem } from './tech-stack-item';

export interface TechStackCategory {
  category: 'backend' | 'frontend' | 'databases' | 'infrastructure';
  icon: LucideIcon;
  items: TechStackItem[];
}
