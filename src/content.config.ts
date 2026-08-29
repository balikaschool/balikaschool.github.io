import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections (brief §4d as amended, on Astro's content-layer API).
 * RULE (CLAUDE.md): fields must stay in sync with public/admin/config.yml —
 * any field change updates both files in the same commit.
 * Photos use image() so every CMS upload goes through Astro's optimizer.
 *
 * OWNER-PROOFING (learned in the 2026-07-11 publish test): Sveltia writes
 * optional fields the owner leaves blank as '' (and lists as []). A strict
 * schema then fails the WHOLE site build on a perfectly normal CMS save.
 * Every optional field below therefore passes through `blank`, which turns
 * '' / null into undefined before validation. Never remove that wrapper.
 */

// '' or null → undefined, so .optional()/.default() behave as intended
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);

const notices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notices' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['Admission', 'Examination', 'Holiday', 'Event', 'General']),
      date: z.coerce.date(),
      photo: z.preprocess(blank, image().optional()),
      gallery: z.preprocess(blank, z.array(image()).optional()),
      featured: z.preprocess(blank, z.boolean().default(false)),
      pinned: z.preprocess(blank, z.boolean().default(false)),
    }),
});

const teachers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teachers' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      designation: z.string(),
      photo: z.preprocess(blank, image().optional()),
      subject: z.preprocess(blank, z.string().optional()),
      phone: z.preprocess(blank, z.string().optional()),
      email: z.preprocess(blank, z.string().optional()),
      arrived: z.preprocess(blank, z.coerce.date().optional()),
      // Late teachers or founders that we want to remember
      memorial: z.preprocess(blank, z.boolean().default(false)),
      order: z.preprocess(blank, z.coerce.number().default(0)),
    }),
});

// Homepage photo strip: owner-curated tiles
const highlights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/highlights' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(), // short caption
      photo: image(),
      link: z.preprocess(blank, z.string().optional()),
      order: z.preprocess(blank, z.coerce.number().default(0)),
    }),
});

export const collections = { notices, teachers, highlights };
