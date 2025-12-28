## 2025-12-28: 扩展交互组件库 (Checkbox, Switch, Toast)

**UI Refactoring**
- **操作**:
    - **Checkbox 组件**: 迁移 `Checkbox` 组件，内联了之前单独引用的 SVG 图标，并适配 Tailwind utility classes。
    - **Switch 组件**: 迁移基于 `Headless UI` 的 `Switch` 组件，保留尺寸配置和动画效果。
    - **Toast 组件**: 迁移全局消息提示系统，移除 `ActionButton` 依赖改用原生按钮，并配置了 Tailwind `backgroundImage` 以支持不同类型的 Toast 背景色。
    - **Tailwind 配置更新**: 在 `tailwind.config.js` 中补充了 `toast-success-bg` 等背景变量映射。
    - **Playground 更新**: 扩充 `App.tsx` 中的演示页面，集成 Checkbox, Switch 和 Toast 的交互示例。
- **决策**:
    - Toast 组件移除对 `use-context-selector` 的强依赖逻辑，改用 React 原生 Context 或直接渲染，但目前仍保留基本架构以最小化改动。
- **状态**: 基础 UI 组件库迁移基本完成，可支撑后续业务页面重构。