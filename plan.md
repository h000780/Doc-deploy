# nata-doc 改造计划

## 目标

将 nata-reports 中的两个设计文档（api-development-manual、app-architecture）迁移到 nata-doc 仓库，实现三个站点独立部署，互不影响。

## 当前状况

### nata-doc（目标仓库）
- 技术栈：Vite + React 18 + shadcn/ui
- 部署方式：`actions/deploy-pages`（GitHub 官方，整体替换）
- 部署 URL：`https://refactored-chainsaw-mwkk12e.pages.github.io/`
- Pages Source：GitHub Actions

### nata-reports（源仓库）
- api-development-manual：Next.js 16 + React 19，basePath `/api-dev-manual`
- app-architecture：Next.js 16 + React 19，basePath `/app-architecture`
- 部署方式：`JamesIves/github-pages-deploy-action`（按子目录部署）

## 改造内容

### 1. 复制文档目录

将以下目录从 nata-reports 复制到 nata-doc 根目录：
- `api-development-manual/`
- `app-architecture/`

### 2. 更新 .gitignore

添加 Next.js 相关忽略项：
- `out`
- `.next`
- `.turbo`

### 3. 改造部署方式

**核心变更：从 `actions/deploy-pages` 切换到 `JamesIves/github-pages-deploy-action`**

原因：`actions/deploy-pages` 每次部署会整体替换站点内容，无法按子目录独立部署。`JamesIves` 支持 `target-folder` + `clean: false`，可以只更新指定目录。

#### 3.1 改造现有 deploy.yml（主站点）

- 触发条件：`src/**`、`public/**`、`index.html`、`vite.config.ts`、`package.json` 变更
- 构建：`bun install` → `bun run build` → `cp dist/index.html dist/404.html`（SPA 路由必需） → 产物在 `dist/`
- 部署：`JamesIves` → `target-folder: .`，`clean-exclude: api-dev-manual, app-architecture`

> `clean-exclude` 确保部署主站时不会删除子目录中的文档。

#### 3.2 新增 deploy-api-manual.yml

- 触发条件：`api-development-manual/**` 变更
- 构建：`pnpm install` → `pnpm build` → 产物在 `api-development-manual/out/`
- 部署：`JamesIves` → `target-folder: api-dev-manual`，`clean: false`

#### 3.3 新增 deploy-app-architecture.yml

- 触发条件：`app-architecture/**` 变更
- 构建：`pnpm install` → `pnpm build` → 产物在 `app-architecture/out/`
- 部署：`JamesIves` → `target-folder: app-architecture`，`clean: false`

#### 3.4 并发控制

三个 workflow 共享同一个 concurrency group：`github-pages-deploy`，防止同时推送 gh-pages 分支导致冲突。

### 4. Next.js basePath 配置

两个文档的 `next.config.mjs` 中 basePath 需要确认与部署路径一致：
- api-development-manual：`basePath: "/api-dev-manual"` ✅ 已正确
- app-architecture：`basePath: "/app-architecture"` ✅ 已正确

无需修改。

## 改造后的目录结构

```
nata-doc/
├── .github/workflows/
│   ├── deploy.yml                 ← 主站点（Vite）
│   ├── deploy-api-manual.yml      ← API 设计规范（Next.js）
│   └── deploy-app-architecture.yml ← 应用架构设计（Next.js）
├── src/                           ← 现有 Vite 项目
├── api-development-manual/        ← API 设计规范
├── app-architecture/              ← 应用架构设计
├── package.json                   ← Vite 项目
└── ...
```

## 改造后的 URL

| 站点 | URL |
|---|---|
| 主站点（不变） | `https://refactored-chainsaw-mwkk12e.pages.github.io/` |
| API 设计规范 | `https://refactored-chainsaw-mwkk12e.pages.github.io/api-dev-manual/` |
| 应用架构设计 | `https://refactored-chainsaw-mwkk12e.pages.github.io/app-architecture/` |

## 部署切换步骤（合并到 main 后）

> ⚠️ 顺序很重要，避免站点短暂不可用

1. 合并分支到 main
2. 手动触发 `Deploy Main Site` workflow，确认 gh-pages 分支已生成且内容正确
3. 到 GitHub 仓库 Settings → Pages → Source，从 "GitHub Actions" 改为 "Deploy from a branch"，选择 `gh-pages` / `root`
4. 验证主站点 URL 正常访问
5. 手动触发另外两个 workflow，验证子路径可访问

## 后续扩展

添加新模块文档时：
1. 在根目录添加新的 Next.js 项目目录
2. 新增对应的 deploy workflow
3. 在主站 deploy.yml 的 `clean-exclude` 中添加新目录名
