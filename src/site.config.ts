export const SITE_TITLE = 'flow';
export const SITE_DESCRIPTION =
  '一个用来写文献阅读、学习笔记、生活记录与项目日志的个人博客。';

export const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/blog/', label: 'Blog' },
  { href: '/reading/', label: 'Reading' },
  { href: '/notes/', label: 'Notes' },
  { href: '/projects/', label: 'Projects' },
  { href: '/archive/', label: '归档' },
] as const;

export const COLLECTION_LABELS = {
  blog: 'Blog',
  reading: 'Reading',
  notes: 'Notes',
  projects: 'Projects',
} as const;
