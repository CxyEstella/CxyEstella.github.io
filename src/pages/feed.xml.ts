import rss from '@astrojs/rss';
import { getAllEntries, getEntryUrl } from '@/lib/content';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/site.config';

export async function GET(context) {
  const entries = (await getAllEntries()).sort(
    (left, right) => right.data.pubDate.getTime() - left.data.pubDate.getTime(),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: getEntryUrl(entry),
    })),
    customData: '<language>zh-cn</language>',
  });
}
