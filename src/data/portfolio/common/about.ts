import { CloudUpload, Layers3, PanelsTopLeft, Server } from 'lucide-react';
import profileImage from '@/assets/about/cover.jpg';
import type { About } from '@/types/portfolio/about/about';

export const commonAbout = {
  identity: {
    firstName: 'Hanat',
    lastName: 'Sharif',
    image: profileImage,
  },
  contact: {
    email: 'sharifhanat359@gmail.com',
    location: 'Columbus, OH',
    linkedin: 'https://www.linkedin.com/in/hanat-sharif/',
    github: 'https://github.com/Hanart-prog',
  },
  specialties: [
    { name: 'Full Stack', icon: Layers3 },
    { name: 'Backend', icon: Server },
    { name: 'Frontend', icon: PanelsTopLeft },
    { name: 'Cloud', icon: CloudUpload },
  ],
} satisfies Pick<About, 'contact' | 'specialties'> & {
  identity: Omit<About['identity'], 'role'>;
};
