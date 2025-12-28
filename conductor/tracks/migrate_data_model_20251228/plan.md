# Track Plan: 迁移数据模型管理页面 (无 Mock)

## Phase 1: 项目脚手架与基础设施
- [ ] Task: 初始化项目结构
    - 创建 `frontend` (Vite) 和 `backend` (FastAPI) 的根目录结构。
    - 配置 `frontend/package.json` (React, Tailwind, Axios/Query)。
    - 配置 `backend/pyproject.toml` (FastAPI, SQLAlchemy, Pydantic, Uvicorn)。
    - 配置基础的 `docker-compose.yml` 以启动 PostgreSQL 和 Redis。
- [ ] Task: 后端核心设置
    - 实现数据库连接逻辑 (`backend/app/db/session.py`)。
    - 创建基础 SQLAlchemy 模型类。
    - 配置 FastAPI CORS 以允许前端请求。
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: 后端实现 (API First)
- [ ] Task: 定义数据模型 Schema
    - 在 `backend/app/models/` 中创建 SQLAlchemy 模型 `DataModel`。
    - 在 `backend/app/schemas/` 中创建 Pydantic Schema (`DataModelCreate`, `DataModelRead`)。
- [ ] Task: 实现 CRUD 端点
    - 在 `backend/app/api/v1/endpoints/data_models.py` 中创建 API 路由。
    - 实现 `GET /` (列表) 及其分页参数。
    - 实现 `POST /` (创建)。
    - 实现 `DELETE /` 和 `PUT /`。
- [ ] Task: 注册路由并验证
    - 将路由注册到主 FastAPI 应用中。
    - 添加脚本或测试以插入种子数据（由于无法 Mock，这对 UI 验证至关重要）。
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: 前端布局与组件
- [ ] Task: 全局布局实现
    - 创建 `MainLayout` 组件。
    - 实现头部 (Logo, 状态占位符, 主题切换)。
    - 实现导航标签 (仅视觉效果和简单的切换逻辑)。
- [ ] Task: API 客户端设置
    - 配置 Axios 实例及其 Base URL。
    - 创建 `api/dataModels.ts` 服务方法。
- [ ] Task: 数据模型页面 - 结构与工具栏
    - 创建 `DataModelPage` 组件。
    - 实现搜索栏和过滤下拉框 (先仅实现 UI)。
    - 实现“新建表”按钮样式。
- [ ] Task: 数据模型页面 - 数据表格集成
    - 使用 Tailwind 实现 Table 组件。
    - **集成**: 从 `GET /api/v1/data-models` 获取数据并渲染行。
    - 将 API 状态字段映射到 UI 颜色 (例如 "Published" -> 绿点)。
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: 打磨与完善
- [ ] Task: 分页集成
    - 将 UI 分页控件连接到 API 分页参数。
- [ ] Task: 复制到剪贴板交互
    - 实现“物理表名”列的复制功能。
- [ ] Task: 最终 UI 打磨
    - 根据截图验证字体、间距和颜色。
    - 确保满足“严格规范” (Linting/Types)。
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)