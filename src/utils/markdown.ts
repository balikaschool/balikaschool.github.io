export function mdToHtml(md: string): string {
  if (!md) return '';
  let html = md.trim();
  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  // Convert images ![alt](url) — must run before link conversion
  html = html.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_match, alt, url, title) =>
      `<img src="${url}" alt="${alt}"${title ? ` title="${title}"` : ''} />`
  );
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
