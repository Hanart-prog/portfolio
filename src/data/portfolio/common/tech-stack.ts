import { CloudUpload, Database, PanelsTopLeft, Server } from 'lucide-react';
import { techStacks } from '@/constants/tech-stacks';
import type { TechStack } from '@/types/portfolio/tech-stack/tech-stack';

export const techStack: TechStack = {
  categories: [
    {
      icon: Server,
      category: 'backend',
      items: [
        techStacks.java,
        techStacks.python,
        techStacks.go,
        techStacks.rust,
        techStacks.c,
        techStacks.cplusplus,
        techStacks.kotlin,
        techStacks.fastApi,
        techStacks.flask,
        techStacks.nodeJs,
        techStacks.pandas,
        techStacks.numpy,
        techStacks.scikitLearn,
      ],
    },
    {
      icon: PanelsTopLeft,
      category: 'frontend',
      items: [
        techStacks.javascript,
        techStacks.typescript,
        techStacks.react,
        techStacks.nextJs,
        techStacks.angular,
        techStacks.vite,
        techStacks.html,
        techStacks.css,
      ],
    },
    {
      icon: Database,
      category: 'databases',
      items: [
        techStacks.postgresql,
        techStacks.dynamoDb,
        techStacks.elasticsearch,
        techStacks.firebase,
        techStacks.sqlite,
      ],
    },
    {
      icon: CloudUpload,
      category: 'infrastructure',
      items: [
        techStacks.aws,
        techStacks.gcp,
        techStacks.docker,
        techStacks.kubernetes,
        techStacks.jenkins,
        techStacks.git,
        techStacks.github,
        techStacks.linux,
        techStacks.datadog,
        techStacks.kibana,
      ],
    },
  ],
};

export default techStack;
