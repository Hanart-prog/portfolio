import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { ProjectCardGallery } from '@/components/sections/projects/card/project-card-gallery';
import { ProjectCardInfo } from '@/components/sections/projects/card/project-card-info';
import type { TechStackItem } from '@/types/portfolio/tech-stack/tech-stack-item';

interface ProjectCardProps {
  images: string[];
  title: string;
  description: string;
  tags: TechStackItem[];
  siteUrl: string;
}

export const ProjectCard = ({
  images,
  title,
  description,
  tags,
  siteUrl,
}: ProjectCardProps): ReactElement => {
  const { t } = useTranslation();
  return (
    <Card
      data-project-card
      className="flex h-full flex-col overflow-hidden rounded-2xl border-0 bg-white shadow-[0_10px_30px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-all duration-500 ease-out ring-inset hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-[0_14px_32px_rgb(25_25_25/0.1)] motion-reduce:transform-none motion-reduce:transition-none dark:bg-[#1a1a1a] dark:shadow-none dark:ring-0 dark:hover:bg-[#222222]"
    >
      <ProjectCardGallery
        images={images}
        title={title}
        previousSlideLabel={t('projects.previousImage')}
        nextSlideLabel={t('projects.nextImage')}
      />
      <ProjectCardInfo
        title={title}
        description={description}
        tags={tags}
        siteUrl={siteUrl}
        websiteAriaLabel={t('projects.viewProjectWebsite', { title })}
      />
    </Card>
  );
};

export default ProjectCard;
