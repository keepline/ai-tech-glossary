# AI 技术术语图谱（2024–2026）

交互式前端：关键 AI 行业技术词条解读 + 关系图谱。纯静态，无后端、无 API Key。

## 功能

- **图谱**：基于 React Flow 的分类簇布局，点击节点查看详情与关系高亮
- **词条列表**：按分类浏览，支持中英文搜索与筛选
- **详情面板**：中英名称、解读、为何重要、相关词条（赋能 / 组成 / 替代 / 组合 / 演进自）
- **八大分类**：模型架构、训练与对齐、推理与效率、RAG与记忆、Agent与工具、多模态、评测与安全、基础设施与部署

## 技术栈

- Vite + React + TypeScript
- Tailwind CSS v4（`@tailwindcss/vite`）
- `@xyflow/react`（React Flow）
- Framer Motion（面板与列表动效）

词条与关系数据：`src/data/terms.ts`。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开终端提示的本地地址（默认 `http://localhost:5173`）。

## 构建

```bash
npm run build
```

产物输出到 `dist/`。

预览构建结果：

```bash
npm run preview
# 或任意静态服务器，例如：
# npx serve dist
```

## 部署到 GitHub Pages

本项目 `vite.config.ts` 中 `base: '/'`，适合：

- 用户/组织主页仓库（`username.github.io`），或
- 自定义域名根路径，或
- 使用 Actions 部署到 Pages 且站点挂在域名根路径

步骤概要：

1. 将本仓库推送到 GitHub
2. 仓库 **Settings → Pages**：Source 选 **GitHub Actions**
3. 添加工作流（示例 `.github/workflows/deploy.yml`）：

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

若部署在**项目子路径**（如 `https://user.github.io/ai-tech-glossary/`），请把 `vite.config.ts` 的 `base` 改为 `'/ai-tech-glossary/'` 后重新构建。

## 免责声明

本站为独立梳理的学习向术语参考，**不代表、不隶属**任何公司、模型或产品方。术语解释力求准确简洁，难免有所取舍，欢迎自行对照一手论文与官方文档。
