## 2025-12-28: 修复 Tailwind v4 构建错误与 Select 组件迁移

**UI Refactoring**
- **操作**:
    - **修复构建崩溃**: 解决 Tailwind v4 无法解析外部 CSS 文件中自定义 `@apply` 类导致的前端崩溃问题。
    - **Button 重构**: 将 `Button` 样式从 `index.css` 移回 `index.tsx` (使用 `cva` 定义)，放弃对 CSS `@apply` 的依赖，确保与 v4 兼容。
    - **配置链接**: 在 `frontend/src/index.css` 中显式添加 `@config "../tailwind.config.js";` 以确保 v4 正确加载自定义主题配置。
    - **组件迁移**:
        - `Badge`: 迁移并重构为 Tailwind utility classes。
        - `PortalToFollowElem`: 安装 `@floating-ui/react` 并迁移，作为 Select 的浮层依赖。
        - `Select`: 安装 `@headlessui/react`, `@heroicons/react`, `@remixicon/react` 并完整迁移下拉框组件 (含 Combobox, Listbox, Portal 模式)。
    - **测试**: 在 Playground 中集成 `Select` 组件演示。
- **决策**:
    - **Utility-First**: 放弃在单独 CSS 文件中使用复杂 `@apply` 的做法，改为在组件内部直接使用 Tailwind utility classes (结合 `cva`)，以减少构建配置复杂度并提高可维护性。
- **状态**: Button, Spinner, Badge, Portal, Select 组件已迁移并可用。