import { getCollection, type CollectionEntry } from 'astro:content';

export const COLLECTIONS = ['blog', 'reading', 'notes', 'projects'] as const;
export type CollectionName = (typeof COLLECTIONS)[number];

export type AnyEntry =
  | CollectionEntry<'blog'>
  | CollectionEntry<'reading'>
  | CollectionEntry<'notes'>
  | CollectionEntry<'projects'>;

export const collectionMeta: Record<
  CollectionName,
  { title: string; summary: string; description: string }
> = {
  blog: {
    title: 'Blog',
    summary: '生活记录与随笔',
    description: '日常写作、阶段总结、生活片段与较完整的博客文章。',
  },
  reading: {
    title: 'Reading',
    summary: '文献阅读与书目卡片',
    description: '论文、书籍和报告的阅读笔记、拆解与延伸问题。',
  },
  notes: {
    title: 'Notes',
    summary: '学习笔记与知识整理',
    description: '课程笔记、概念解释、代码片段与方法总结。',
  },
  projects: {
    title: 'Projects',
    summary: '项目记录与迭代日志',
    description: '项目动机、过程决策、踩坑记录、复盘与后续计划。',
  },
};

export function sortEntries<T extends AnyEntry>(entries: T[]) {
  return [...entries].sort((left, right) => {
    const leftDate = left.data.updatedDate ?? left.data.pubDate;
    const rightDate = right.data.updatedDate ?? right.data.pubDate;
    return rightDate.getTime() - leftDate.getTime();
  });
}

export async function getEntries(collection: CollectionName) {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return sortEntries(entries);
}

export async function getAllEntries() {
  const groups = await Promise.all(COLLECTIONS.map((collection) => getEntries(collection)));
  return sortEntries(groups.flat()) as AnyEntry[];
}

export function getEntryUrl(entry: AnyEntry) {
  return `/${entry.collection}/${entry.slug}/`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatCompactDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function extractPlainText(markdown: string) {
  return markdown
    .replace(/^---[\s\S]*?---/, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$([^$]+)\$/g, ' $1 ')
    .replace(/[#>*_|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function estimateReadingMinutes(entry: AnyEntry) {
  const characters = extractPlainText(
    `${entry.data.title} ${entry.data.description} ${entry.body}`,
  ).replace(/\s+/g, '').length;

  return Math.max(1, Math.round(characters / 320));
}

export function groupEntriesByMonth(entries: AnyEntry[]) {
  const byPublication = [...entries].sort(
    (left, right) => right.data.pubDate.getTime() - left.data.pubDate.getTime(),
  );
  const groups = new Map<string, { label: string; entries: AnyEntry[] }>();

  for (const entry of byPublication) {
    const key = `${entry.data.pubDate.getFullYear()}-${String(
      entry.data.pubDate.getMonth() + 1,
    ).padStart(2, '0')}`;
    const label = new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
    }).format(entry.data.pubDate);

    if (!groups.has(key)) {
      groups.set(key, { label, entries: [] });
    }

    groups.get(key)?.entries.push(entry);
  }

  return Array.from(groups.entries()).map(([key, value]) => ({
    key,
    label: value.label,
    entries: value.entries,
  }));
}

export function getUniqueTags(entries: AnyEntry[]) {
  return Array.from(new Set(entries.flatMap((entry) => entry.data.tags))).sort((a, b) =>
    a.localeCompare(b, 'zh-CN'),
  );
}
