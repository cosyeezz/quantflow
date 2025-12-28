## 2025-12-28: 深色模式适配 (Dark Mode Support)

**UI Refactoring**
- **操作**:
    - **CSS 变量补全**: 在 `frontend/src/dify-theme.css` 中新增 `:root.dark` 块，为核心 UI 组件（Input, Checkbox, Switch, Toast, Buttons）使用的 `components-*` 变量添加了深色模式下的映射值。
    - **智能映射**: 将遗留的 `dify-colors` 变量映射到新的 `eq-*` 语义化变量（如 `eq-bg-surface`, `eq-text-primary`），确保新旧组件在深色模式下的一致性。
    - **Toast 适配**: 为 Toast 组件配置了深色模式下的半透明背景色，确保文字对比度。
- **决策**:
    - 采用 "覆盖式" 策略修复深色模式：不直接修改遗留组件代码，而是通过 CSS 变量层面的重写来全局生效。这比逐个修改组件类名更高效且风险更低。
- **状态**: 核心交互组件（Checkbox, Switch, Toast）现已支持深色模式。
