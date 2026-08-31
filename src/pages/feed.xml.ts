import { getCollection } from 'astro:content';

function mdToHtml(md: string): string {
  if (!md) return '';
  // Convert headers
  let html = md.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Convert bold and italics
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert lists
  html = html.replace(/^\s*-\s+(.*)$/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)+/gs, (match) => `<ul>${match}</ul>`);
  
  // Convert paragraphs (split by double newlines)
  const paragraphs = html.split(/\n{2,}/);
  html = paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<li>')) {
      return p;
    }
    return `<p>${p.replace(/\n/g, '<br />')}</p>`;
  }).join('\n');
  
  return html;
}

export async function GET(context: any) {
  const notices = await getCollection('notices');
  const sorted = notices.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  
  const siteUrl = context.site ? context.site.toString() : 'https://balikaschool.github.io';
  const siteUrlString = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;

  const items = sorted.map(notice => {
    const noticeUrl = `${siteUrlString}notices/${notice.id}`;
    let htmlContent = mdToHtml(notice.body || '');
    
    // If there are attachments, append download links
    if (notice.data.attachments && notice.data.attachments.length > 0) {
      htmlContent += `<h3>Attachments</h3><ul>`;
      notice.data.attachments.forEach(att => {
        const fileUrl = att.file.startsWith('/') ? `${siteUrlString}${att.file.slice(1)}` : `${siteUrlString}${att.file}`;
        htmlContent += `<li><a href="${fileUrl}">${att.label || 'Download File'}</a></li>`;
      });
      htmlContent += `</ul>`;
    }

    return `
    <item>
      <title><![CDATA[${notice.data.title}]]></title>
      <link>${noticeUrl}</link>
      <guid isPermaLink="true">${noticeUrl}</guid>
      <pubDate>${notice.data.date.toUTCString()}</pubDate>
      <category>${notice.data.category}</category>
      <description><![CDATA[${htmlContent}]]></description>
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Shree Sharada Balika Namuna Secondary School - Notices</title>
  <link>${siteUrlString}notices</link>
  <description>Official announcements and notices from Shree Sharada Balika Namuna Secondary School, Dharan-16, Sunsari</description>
  <language>ne-np</language>
  <atom:link href="${siteUrlString}feed.xml" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
