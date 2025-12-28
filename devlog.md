## 2025-12-28: 核心交互组件迁移 (Input, Tooltip, Modal)

**UI Refactoring**
- **操作**:
    - **Input 组件**: 迁移 `Input` 组件，移除对遗留 `CopyFeedback` 的临时依赖，保留搜索图标、清除按钮、尺寸控制等核心功能。使用 `cva` 管理状态样式。
    - **Tooltip 组件**: 安装 `ahooks` 依赖，迁移 `Tooltip` 及其管理器 `TooltipManager`，实现基于 `Portal` 的悬浮提示。
    - **Modal 组件**: 迁移基于 `Headless UI` 的 `Modal` 对话框，适配 Tailwind v4 样式类。
    - **Playground 集成**: 在 `App.tsx` 中扩充 Playground，增加 Input, Tooltip, Modal 的交互示例，形成完整的 UI 组件预览页。
- **决策**:
    - 暂时剥离 Input 组件中的“复制”功能 (`CopyFeedback`)，降低初始迁移复杂度，待后续作为独立功能模块补全。
- **状态**: 核心交互组件库初具规模，Playground 可用于验收测试。
