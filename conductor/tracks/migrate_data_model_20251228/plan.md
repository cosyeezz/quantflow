# Track Plan: 迁移数据模型管理页面 (无 Mock)

## Phase 1: 项目脚手架与基础设施 (Completed)
- [x] Task: 初始化项目结构 e845ab9
- [x] Task: 后端核心设置 98397d6
- [x] Task: Conductor - User Manual Verification 'Phase 1' [checkpoint: fcd6e8d]

## Phase 2: 前端迁移 (UI First)
- [ ] Task: 探索与定位前端资源
    - 分析 `easyquant_old_code/client`，识别数据模型管理相关的 Page、Component、Route 和 Service 文件。
    - 记录关键文件路径。
- [ ] Task: 迁移前端基础配置
    - 检查并迁移必要的 `package.json` 依赖。
    - 同步 `tailwind.config.js` 和其他构建配置。
    - 迁移全局样式和主题配置。
- [ ] Task: 迁移 UI 组件与页面
    - 复制并适配数据模型管理页面 (`DataModelPage` 或类似)。
    - 复制并适配相关子组件 (表格、工具栏、弹窗等)。
    - 适配路由配置。
- [ ] Task: 迁移前端服务层
    - 复制并适配 API 请求函数 (Axios/React Query)。
    - 定义 TypeScript 类型定义 (Interfaces)。
- [ ] Task: 前端构建与运行验证
    - 解决编译错误。
    - 确保页面可访问（即使无数据或报错）。
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: 后端迁移 (Database & API)
- [ ] Task: 探索与定位后端资源
    - 分析 `easyquant_old_code/server`，识别对应的 API 路由、Models 和 Schemas。
- [ ] Task: 迁移数据模型 (Models & Schemas)
    - 迁移 SQLAlchemy 模型文件。
    - 迁移 Pydantic Schema 定义。
    - 迁移数据库基础类 (`base.py` 等)。
- [ ] Task: 迁移 API 端点
    - 迁移 API 路由文件。
    - 适配依赖注入 (DB Session)。
    - 注册路由到 FastAPI `main.py`。
- [ ] Task: 前后端联调
    - 验证前端能否成功调用后端接口。
    - 修复数据格式不匹配问题。
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: 打磨与完善
- [ ] Task: 最终 UI/UX 检查
    - 确保样式与旧版/截图一致。
    - 检查交互细节（分页、复制功能等）。
- [ ] Task: 清理与规范化
    - 移除未使用的代码。
    - 运行 Lint 和 Type Check。
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
