import type { ImageMetadata } from 'astro';

// Eagerly index all static assets in src/assets so markdown images can be resolved to bundled URLs
const imageModules = import.meta.glob<{ default: ImageMetadata | string }>(
  '/src/assets/**/*.{jpeg,jpg,png,gif,webp,svg,JPEG,JPG,PNG,GIF,WEBP,SVG}',
  { eager: true }
);

export function resolveAssetUrl(rawUrl: string): string {
  if (!rawUrl) return rawUrl;
  
  // External or absolute data/protocol URLs
  if (/^(https?:|\/\/|data:)/i.test(rawUrl)) {
    return rawUrl;
  }

  let clean = rawUrl.trim().replace(/^['"]|['"]$/g, '');

  // Public folder assets (e.g. /uploads/..., /admin/..., /favicon...)
  if (clean.startsWith('/uploads/') || clean.startsWith('/admin/') || clean.startsWith('/favicon') || clean.startsWith('/balika.')) {
    return clean;
  }

  // Normalize relative paths to /src/assets/...
  let assetPath = clean;
  if (assetPath.startsWith('../../assets/')) {
    assetPath = '/src/assets/' + assetPath.slice('../../assets/'.length);
  } else if (assetPath.startsWith('../assets/')) {
    assetPath = '/src/assets/' + assetPath.slice('../assets/'.length);
  } else if (assetPath.startsWith('./assets/')) {
    assetPath = '/src/assets/' + assetPath.slice('./assets/'.length);
  } else if (assetPath.startsWith('/assets/')) {
    assetPath = '/src/assets/' + assetPath.slice('/assets/'.length);
  } else if (assetPath.startsWith('assets/')) {
    assetPath = '/src/assets/' + assetPath.slice('assets/'.length);
  } else if (assetPath.startsWith('src/assets/')) {
    assetPath = '/' + assetPath;
  }

  // Check exact path match
  if (imageModules[assetPath]) {
    const mod = imageModules[assetPath];
    return typeof mod.default === 'string' ? mod.default : mod.default.src;
  }

  // Fallback: match by filename suffix across all assets
  const filename = clean.split('/').pop()?.split('?')[0];
  if (filename) {
    for (const [key, mod] of Object.entries(imageModules)) {
      if (key.endsWith('/' + filename)) {
        return typeof mod.default === 'string' ? mod.default : mod.default.src;
      }
    }
  }

  return clean;
}

export function mdToHtml(md: string): string {
  if (!md) return '';
  let html = md.trim();

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Convert markdown images ![alt](url "title") — must run before link conversion
  html = html.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_match, alt, url, title) => {
      const resolved = resolveAssetUrl(url);
      return `<img src="${resolved}" alt="${alt || ''}"${title ? ` title="${title}"` : ''} loading="lazy" decoding="async" />`;
    }
  );

  // Resolve raw HTML <img src="..."> tags
  html = html.replace(/<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi, (_match, before, src, after) => {
    const resolved = resolveAssetUrl(src);
    return `<img ${before}src="${resolved}"${after}>`;
  });

  // Convert links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert bold and italics
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert bullet lists
  html = html.replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>');
  html = html.replace(/(<li>(?:(?!<\/li>).|\n)*?<\/li>)+/gs, (match) => `<ul>${match}</ul>`);

  // Convert paragraphs (split by double newlines)
  const paragraphs = html.split(/\n{2,}/);
  html = paragraphs
    .map((p) => {
      p = p.trim();
      if (!p) return '';
      if (
        p.startsWith('<h1') ||
        p.startsWith('<h2') ||
        p.startsWith('<h3') ||
        p.startsWith('<ul') ||
        p.startsWith('<ol') ||
        p.startsWith('<li') ||
        p.startsWith('<img')
      ) {
        return p;
      }
      return `<p>${p.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');

  return html;
}

