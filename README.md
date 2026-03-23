# 纸舟

一个基于 `Astro` 的个人博客骨架，适合放文献阅读笔记、学习笔记、生活记录和项目日志。

## 已包含能力

- `Markdown / MDX`
- 图片资源与相对路径引用
- 数学公式 `KaTeX`
- 代码块高亮
- 标签页与归档页
- RSS
- 站内搜索
- 暗色模式
- GitHub Pages 自动部署
- Pages CMS 可视化内容编辑

## 本地启动

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 写作位置

- `src/content/blog/`
- `src/content/reading/`
- `src/content/notes/`
- `src/content/projects/`

每篇文章建议使用单独文件夹：

```text
src/content/notes/my-note/
  index.mdx
  cover.svg
  figure-1.png
```

这样正文图片可以直接在 Markdown 里写相对路径：

```md
![示意图](./figure-1.png)
```

## 需要你改的地方

- 仓库名如果是 `用户名.github.io`，会作为主站部署
- 如果仓库名是普通项目名，会自动以 `https://用户名.github.io/仓库名/` 发布
- 站点标题和导航可以在 `src/site.config.ts` 调整
- 想换整体风格，可以从 `src/styles/global.css` 开始改

## 部署到 GitHub

1. 创建 GitHub 仓库
2. 推送代码到 `main`
3. 在仓库 `Settings -> Pages` 中确认 `Source` 为 `GitHub Actions`
4. 等待 `.github/workflows/deploy.yml` 执行完成

## Visual Editing With Pages CMS

这个仓库已经包含 `.pages.yml` 配置，你可以直接使用 [Pages CMS](https://app.pagescms.org/) 在浏览器里编辑内容。

使用方法：

1. 打开 `https://app.pagescms.org/`
2. 用 GitHub 账号登录
3. 选择仓库 `CxyEstella/CxyEstella.github.io`
4. 在 `Blog`、`Reading`、`Notes`、`Projects` 里编辑内容
5. 保存并发布

CMS 上传的图片会放在 `public/uploads/`。
如果文章里用了复杂 MDX 语法、数学公式或比较特殊的格式，发布前仍然建议简单检查一下源码。
