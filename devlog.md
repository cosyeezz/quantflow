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

## 2025-12-28: 工具栏重构与布局回滚 (Toolbar Refactor & Layout Rollback)

**UI Refactoring / Bug Fix**
- **操作**:
    - **实现 Toolbar 组件集**: 根据截图复刻了 `Toolbar`, `ToolbarSearch`, `ToolbarSelect` 等组件，实现了带边框的搜索框和 Ghost 风格的下拉菜单。
    - **优化 LegacySelect**: 升级下拉框样式为 `rounded-xl` + `shadow-2xl`，调整选项间距和选中态样式，使其符合新设计规范。
    - **修复布局偏移**: 解决了 Header 导致的页面内容整体偏移和滚动空白问题。尝试了 Flex 全屏布局方案，最终决定**回滚**到最稳健的 `min-h-screen` + `sticky header` 标准文档流布局，移除了所有复杂的视口锁定和动画代码。
- **决策**: 
    - 放弃 `h-screen` + `overflow-hidden` 的类原生应用布局，回归网页标准的文档流滚动，以彻底解决兼容性和渲染错位问题。
    - 确立 `LegacySelect` 为当前阶段的首选下拉组件。
- **状态**: 核心布局架构重置为稳定版本，顶部工具栏样式更新完毕。