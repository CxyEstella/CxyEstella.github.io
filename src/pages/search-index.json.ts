import type { APIRoute } from 'astro';
import { collectionMeta, extractPlainText, getAllEntries, getEntryUrl } from '@/lib/content';
import { withBase } from '@/lib/urls';

export const prerender = true;

export const GET: APIRoute = async () => {
  const entries = await getAllEntries();
  const payload = entries.map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    tags: entry.data.tags,
    date: entry.data.pubDate.toISOString().slice(0, 10),
    collection: collectionMeta[entry.collection].title,
    url: withBase(getEntryUrl(entry)),
    text: extractPlainText(entry.body).slice(0, 5000),
  }));

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
