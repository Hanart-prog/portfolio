import type { Education } from './education';
import type { Specialty } from './specialty';

export interface About {
  identity: {
    firstName: string;
    lastName: string;
    role: string;
    image: string;
  };
  introduction: { tagline: string; summary: string; biography: string };
  contact: {
    email: string;
    location: string;
    linkedin: string;
    github: string;
  };
  cv: string;
  specialties: Specialty[];
  education: Education[];
}
