import { defineCollection, z } from 'astro:content';

const baseSchema = ({ image }) =>
  z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    toc: z.boolean().default(true),
    cover: z.union([image(), z.string()]).optional(),
    coverAlt: z.string().optional(),
  });

const blog = defineCollection({
  schema: baseSchema,
});

const reading = defineCollection({
  schema: ({ image }) =>
    baseSchema({ image }).extend({
      authors: z.array(z.string()).default([]),
      source: z.string().optional(),
      year: z.number().int().optional(),
      paperUrl: z.string().url().optional(),
      translationUrl: z.string().url().optional(),
      takeaway: z.string().optional(),
    }),
});

const notes = defineCollection({
  schema: ({ image }) =>
    baseSchema({ image }).extend({
      series: z.string().optional(),
    }),
});

const projects = defineCollection({
  schema: ({ image }) =>
    baseSchema({ image }).extend({
      status: z
        .enum(['planning', 'active', 'paused', 'done', 'archived'])
        .default('active'),
      stack: z.array(z.string()).default([]),
      repoUrl: z.string().url().optional(),
      startedDate: z.coerce.date().optional(),
      finishedDate: z.coerce.date().optional(),
    }),
});

export const collections = {
  blog,
  reading,
  notes,
  projects,
};
