/**
 * Project data, hoisted out of the Projects component so the same records feed
 * BOTH the rendered markup and the SoftwareSourceCode JSON-LD. Rendering and
 * structured data can therefore never disagree — a mismatch between the two is
 * a structured-data violation Google penalises.
 */
import { createClient } from '@sanity/client';

export type Project = {
  _id: string;
  name: string;
  category: string;
  description: string;
  url?: string;
  links?: { label: string; url: string }[];
  /** Poster/preview image. Site-relative path or absolute URL. */
  posterImage: string;
  videoUrl?: string;
  /** Feeds schema.org SoftwareSourceCode.programmingLanguage. */
  programmingLanguage?: string[];
  /** Intrinsic poster dimensions — required to reserve layout space and avoid CLS. */
  posterWidth?: number;
  posterHeight?: number;
};

const fallbackProjects: Project[] = [
  {
    _id: 'liberty-supply-connect',
    name: 'Liberty Supply Connect',
    category: 'Internal Enterprise Platform',
    description:
      'Internal enterprise platform for Liberty Supply, a commercial HVAC parts distributor. Built with Nuxt 4, Vue 3, TypeScript, PrimeVue 4, and Pinia on a Directus CMS backend — with FedEx/UPS carrier integrations, real-time rate calculation, label generation, and embedded Looker analytics dashboards.',
    url: 'https://libertysupply.com',
    links: [{ label: 'Visit Website', url: 'https://libertysupply.com' }],
    posterImage: '/projects/liberty-connect.webp',
    posterWidth: 1280,
    posterHeight: 741,
    programmingLanguage: ['TypeScript', 'JavaScript', 'Vue', 'Nuxt'],
  },
  {
    _id: 'smart-attendance-hr',
    name: 'Smart Attendance — HR Portal',
    category: 'Web App',
    description:
      'HR portal for employee management, shift scheduling, attendance tracking, and approval workflows.',
    posterImage: '/projects/hr-poster.webp',
    posterWidth: 1280,
    posterHeight: 688,
    videoUrl: '/projects/hr.mp4',
    programmingLanguage: ['JavaScript', 'TypeScript', 'Vue'],
  },
  {
    _id: 'smart-attendance-admin',
    name: 'Smart Attendance — Admin Portal',
    category: 'Admin Console',
    description:
      'Super Admin portal for onboarding organizations, managing HR users, and system-wide configuration.',
    posterImage: '/projects/admin-poster.webp',
    posterWidth: 1280,
    posterHeight: 686,
    videoUrl: '/projects/admin.mp4',
    programmingLanguage: ['JavaScript', 'TypeScript', 'Vue'],
  },
  {
    _id: 'smart-attendance-emp',
    name: 'Smart Attendance — Employee Portal',
    category: 'Employee Experience',
    description:
      'Employee-facing portal to view shifts, track attendance history, and submit WFH or shift requests.',
    posterImage: '/projects/emp-poster.webp',
    posterWidth: 1280,
    posterHeight: 687,
    videoUrl: '/projects/emp.mp4',
    programmingLanguage: ['JavaScript', 'TypeScript', 'Vue'],
  },
];

/**
 * Returns projects from Sanity when credentials are configured, otherwise the
 * checked-in fallback set. Called once per build from the page, then shared with
 * every consumer — never call this more than once per render.
 */
export async function getProjects(): Promise<Project[]> {
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) return fallbackProjects;

  const query = `*[_type == "projects"] | order(sortOrder asc) {
  _id,
  name,
  category,
  description,
  url,
  "posterImage": posterImage.asset->url,
  "posterWidth": posterImage.asset->metadata.dimensions.width,
  "posterHeight": posterImage.asset->metadata.dimensions.height,
  "videoUrl": video.asset->url,
}`;

  try {
    const sanityClient = createClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
    });
    const projects = await sanityClient.fetch(query);
    return Array.isArray(projects) && projects.length > 0 ? projects : fallbackProjects;
  } catch (error) {
    console.warn('Sanity fetch failed, using fallback projects.', error);
    return fallbackProjects;
  }
}
