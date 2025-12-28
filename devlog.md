## 2025-12-28: 视觉优化 (Visual Polish)

**UI Refactoring**
- **操作**:
    - **修复深色模式输入框错误状态**: 将 `input` 组件在 error 状态下的背景色从纯白 (`#ffffff`) 修改为半透明深红 (`rgba(69, 10, 10, 0.2)`), 边框颜色适配深色主题，解决视觉突兀问题。
    - **优化 Tertiary 按钮**: 调整 Tertiary 按钮在深色模式下的背景色为 `eq-bg-elevated`，避免出现高亮白色块。
- **状态**: UI 组件库视觉一致性进一步提升。

## 2025-12-28: 提升亮色模式对比度与排版组件 (Light Mode Contrast & Typography)

**UI Refactoring**
- **操作**: 
    - **提升亮色模式对比度**: 修改 `input` 背景为纯白并增加默认灰色边框 (`eq-border-default`)，加深 `Checkbox` 和 `Switch` 在未选中/禁用状态下的灰色，提升在纯白背景下的识别度。
    - **新增 Typography 组件**: 创建了标准化的 `Heading` (H1-H6) 和 `Text` 组件，支持多种字号、字重和置灰状态。
    - **更新 UI Playground**: 在 `App.tsx` 中增加了 Typography 演示区域，并将所有部分标题替换为新的 `Heading` 组件。
- **决策**: 为了保证组件在亮色模式下的“存在感”，放弃了部分透明背景的设计，转而使用显式的边框和更深的灰度级。
- **状态**: 基础 UI 组件库 (Atomic Components) 迁移接近完成，对比度和排版规范已确立。
