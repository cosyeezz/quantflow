## 2025-12-28: 修复 Tailwind v4 配置与启动 UI 重构

**UI Infrastructure & Refactoring**
- **操作**:
    - 发现并修复 Tailwind CSS v4 与 PostCSS 配置不匹配导致样式丢失的问题。
    - 将 `postcss.config.js` 修正为使用 `@tailwindcss/postcss`。
    - 升级 `frontend/src/index.css` 至 Tailwind v4 语法 (`@import "tailwindcss";`)。
    - 创建 Track `ui_refactor_20251228`，规划原子组件迁移路径。
    - 建立组件库基础结构 (`src/components/ui`)，创建工具函数 `utils.ts` (cn)。
    - 迁移首批组件 `Button` 和 `Spinner`，并引入 `class-variance-authority`。
    - 在 `App.tsx` 中增加 Playground Tab 用于组件可视化测试。
- **决策**:
    - 确认项目升级至 Tailwind v4，不再回退至 v3。
    - 采用 Shadcn UI 风格的工程结构 (`components/ui` + `lib/utils`) 管理迁移后的组件。
- **状态**: 样式修复完成，UI Track 已启动，Button/Spinner 可用。
