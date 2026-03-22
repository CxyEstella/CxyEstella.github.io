import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const [owner = 'your-username', repository = 'your-username.github.io'] =
  (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite =
  repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const site = process.env.SITE_URL ?? `https://${owner || 'your-username'}.github.io`;
const base =
  process.env.BASE_PATH ?? (repository && !isUserSite ? `/${repository}` : '/');

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});

