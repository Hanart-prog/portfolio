import buildFlowDemo from '@/assets/projects/buildflow/demo.gif';
import buildFlow01 from '@/assets/projects/buildflow/demo-01.jpg';
import buildFlow02 from '@/assets/projects/buildflow/demo-02.jpg';
import buildFlow03 from '@/assets/projects/buildflow/demo-03.jpg';
import buildFlow04 from '@/assets/projects/buildflow/demo-04.jpg';
import codeAtlasDemo from '@/assets/projects/codeatlas/demo.gif';
import codeAtlas01 from '@/assets/projects/codeatlas/demo-01.jpg';
import codeAtlas02 from '@/assets/projects/codeatlas/demo-02.jpg';
import codeAtlas03 from '@/assets/projects/codeatlas/demo-03.jpg';
import codeAtlas04 from '@/assets/projects/codeatlas/demo-04.jpg';
import ghostTrafficDemo from '@/assets/projects/ghosttraffic/demo.gif';
import ghostTraffic01 from '@/assets/projects/ghosttraffic/demo-01.jpg';
import ghostTraffic02 from '@/assets/projects/ghosttraffic/demo-02.jpg';
import ghostTraffic03 from '@/assets/projects/ghosttraffic/demo-03.jpg';
import xtrinelCover from '@/assets/projects/xtrinel/cover.svg';
import { techStacks } from '@/constants/tech-stacks';
import type { Project } from '@/types/portfolio/projects/project';

export const commonProjects = [
  {
    name: 'Build Flow AI',
    images: [buildFlowDemo, buildFlow01, buildFlow02, buildFlow03, buildFlow04],
    techStack: [
      techStacks.typescript,
      techStacks.react,
      techStacks.nodeJs,
      techStacks.express,
      techStacks.postgresql,
      techStacks.vite,
    ],
    website: 'https://github.com/Hanart-prog/buildflow-ai',
  },
  {
    name: 'GhostTraffic',
    images: [ghostTrafficDemo, ghostTraffic01, ghostTraffic02, ghostTraffic03],
    techStack: [
      techStacks.go,
      techStacks.react,
      techStacks.typescript,
      techStacks.vite,
      techStacks.docker,
    ],
    website: 'https://github.com/Hanart-prog/ghosttraffic',
  },
  {
    name: 'CodeAtlas',
    images: [
      codeAtlasDemo,
      codeAtlas01,
      codeAtlas02,
      codeAtlas03,
      codeAtlas04,
    ],
    techStack: [
      techStacks.rust,
      techStacks.sqlite,
      techStacks.react,
      techStacks.typescript,
    ],
    website: 'https://github.com/Hanart-prog/codeatlas',
  },
  {
    name: 'Xtrinel',
    images: [xtrinelCover],
    techStack: [
      techStacks.nextJs,
      techStacks.python,
      techStacks.fastApi,
      techStacks.docker,
      techStacks.gcp,
      techStacks.datadog,
    ],
    website: 'https://xtrinel.com/',
  },
] satisfies Omit<Project, 'description'>[];
