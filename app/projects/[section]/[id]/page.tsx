import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectDetail from '@/components/Projects/ProjectDetail';
import { sections, type SectionKey } from '@/data/projects';

const SITE_URL = 'https://alihaider.dev'; // ← keep in sync

interface PageProps {
  params: Promise<{ section: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, id } = await params;
  const project = sections[section as SectionKey]?.find(
    (p) => String(p.id) === id,
  );

  if (!project) return { title: 'Project not found' };

  const description = project.summary.slice(0, 155);
  const url = `/projects/${section}/${id}`;

  return {
    title: project.title,
    description,
    alternates: { canonical: url },
    keywords: [
      ...project.tags,
      ...project.techStack,
      'Ali Haider',
      'full-stack project',
    ],
    openGraph: {
      type: 'article',
      url,
      title: project.title,
      description,
      images: [{ url: project.image[0], width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
      images: [project.image[0]],
    },
  };
}

export function generateStaticParams() {
  return Object.entries(sections).flatMap(([section, list]) =>
    list.map((p) => ({ section, id: String(p.id) })),
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { section, id } = await params;
  const list = sections[section as SectionKey];
  if (!list) notFound();

  const project = list.find((p) => String(p.id) === id);
  if (!project) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: project.title,
            description: project.summary,
            image: project.image,
            applicationCategory: 'WebApplication',
            operatingSystem: 'Any',
            author: {
              '@type': 'Person',
              name: 'Ali Haider',
              url: SITE_URL,
            },
            keywords: project.tags.join(', '),
            ...(project.github && { codeRepository: project.github }),
            ...(project.link && { url: project.link }),
          }).replace(/</g, '\\u003c'),
        }}
      />
      <ProjectDetail project={project} section={section} />
    </>
  );
}