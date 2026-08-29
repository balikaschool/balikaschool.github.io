import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections (brief §4d as amended, on Astro's content-layer API).
 * RULE (CLAUDE.md): fields must stay in sync with public/admin/config.yml —
 * any field change updates both files in the same commit.
 * Photos use image() so every CMS upload goes through Astro's optimizer.
 *
 * OWNER-PROOFING (learned in the 2026-07-11 publish test & 2026-08-29 CMS test):
 * Sveltia CMS writes optional fields the owner leaves blank as '' (and lists as []).
 * Furthermore, unquoted dates in YAML (like dob: 2033-07-05) or numbers are parsed
 * by js-yaml as Date objects or Numbers before Zod validation.
 * Every optional string field passes through `toOptionalString`, which turns
 * '', null, Date objects, and numbers into valid strings or undefined before validation.
 */

const blank = (v: unknown) => (v === '' || v === null ? undefined : v);

const toOptionalString = (v: unknown) => {
  if (v === '' || v === null || v === undefined) return undefined;
  if (v instanceof Date) {
    const yyyy = v.getUTCFullYear();
    const mm = String(v.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(v.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  return String(v).trim();
};

const notices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notices' }),
  schema: ({ image }) =>
    z.object({
      title: z.preprocess(toOptionalString, z.string()),
      category: z.enum(['Admission', 'Examination', 'Holiday', 'Event', 'General']),
      date: z.coerce.date(),
      photo: z.preprocess(blank, image().optional()),
      gallery: z.preprocess(blank, z.array(image()).optional()),
      featured: z.preprocess(blank, z.boolean().default(false)),
      pinned: z.preprocess(blank, z.boolean().default(false)),
      // Downloadable attachments: docs, PDFs, ZIPs, etc.
      attachments: z.preprocess(
        blank,
        z
          .array(
            z.object({
              label: z.preprocess(toOptionalString, z.string().optional()),
              file: z.string(),
            })
          )
          .optional()
      ),
    }),
});

const teachers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teachers' }),
  schema: ({ image }) =>
    z.object({
      name: z.preprocess(toOptionalString, z.string()),
      designation: z.preprocess(toOptionalString, z.string()),
      photo: z.preprocess(blank, image().optional()),
      subject: z.preprocess(toOptionalString, z.string().optional()),
      phone: z.preprocess(toOptionalString, z.string().optional()),
      address: z.preprocess(toOptionalString, z.string().optional()),
      dob: z.preprocess(toOptionalString, z.string().optional()),
      bloodGroup: z.preprocess(toOptionalString, z.string().optional()),
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
      title: z.preprocess(toOptionalString, z.string()), // short caption
      photo: image(),
      link: z.preprocess(toOptionalString, z.string().optional()),
      order: z.preprocess(blank, z.coerce.number().default(0)),
    }),
});

export const collections = { notices, teachers, highlights };
