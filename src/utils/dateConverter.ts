/**
 * Thin wrapper around @inicrea/bikram-sambat-core for BS date formatting.
 * The underlying library uses verified day-by-day data (BS 1975–2100).
 */
import { adToBs, formatBs } from '@inicrea/bikram-sambat-core';

/**
 * Formats a JS Date into a Bikram Sambat date string.
 * @param date    Standard JS Date object
 * @param lang    'en' | 'ne'
 * @param showEra Prefix वि.सं. in Nepali mode (default: true)
 */
export function formatBsDate(date: Date, lang: 'en' | 'ne' = 'en', showEra = true): string {
  const bs = adToBs(date);
  if (lang === 'ne') {
    const formatted = formatBs(bs, 'YYYY MMMM D', { locale: 'ne' });
    return showEra ? `वि.सं. ${formatted}` : formatted;
  }
  return formatBs(bs, 'YYYY MMMM D');
}
