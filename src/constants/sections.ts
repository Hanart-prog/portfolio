import {
  BriefcaseBusiness,
  FolderGit2,
  House,
  Mail,
  UserRound,
  type LucideIcon,
} from 'lucide-react';

export type SubsectionId = 'tech-stack' | 'trajectory';
export type SectionId =
  'home' | 'about' | 'experience' | 'projects' | 'contact';

export interface Subsection {
  id: SubsectionId;
}

export interface Section {
  id: SectionId;
  icon: LucideIcon;
  subsections?: Record<string, Subsection>;
}

export const sections = {
  home: { id: 'home', icon: House },
  about: { id: 'about', icon: UserRound },
  experience: {
    id: 'experience',
    icon: BriefcaseBusiness,
    subsections: {
      techStack: { id: 'tech-stack' },
      trajectory: { id: 'trajectory' },
    },
  },
  projects: { id: 'projects', icon: FolderGit2 },
  contact: { id: 'contact', icon: Mail },
} as const satisfies Record<string, Section>;
