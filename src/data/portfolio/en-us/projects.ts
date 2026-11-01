import { commonProjects } from '@/data/portfolio/common/projects';
import type { Projects } from '@/types/portfolio/projects/projects';

const projectDescriptions = {
  'Build Flow AI':
    'Talk through a software idea and watch the plan draw itself. A two-stage LLM streaming pipeline turns speech into React Flow diagrams, while schema validation, error-feedback retries, and an add-only merge strategy keep AI output safe to auto-save.',
  GhostTraffic:
    'A Go reverse proxy and replay engine that records HTTP traffic and replays it against two backend versions, comparing latency percentiles, status codes, and responses. In its demo it stays quiet on identical code, catches a deliberately slow query, and clears the repaired version.',
  CodeAtlas:
    'A local-first static analysis engine in Rust that combines Git co-change history with dependency traversal to rank what a change is likely to affect. On six held-out open-source projects, its top 5 included a file that really changed in 46% of commits, against 20% for a most-changed-files baseline.',
  Xtrinel:
    'A multi-tenant FastAPI backend with tenant-scoped queries, custom RBAC, and 45 automated tests enforcing data isolation across 4 tenants. Datadog APM tracing and a move to GCP Cloud Run took average API latency from 800ms to 240ms.',
} satisfies Record<(typeof commonProjects)[number]['name'], string>;

export const projects: Projects = {
  items: commonProjects.map((project) => ({
    ...project,
    description:
      projectDescriptions[project.name as keyof typeof projectDescriptions],
  })),
};

export default projects;
