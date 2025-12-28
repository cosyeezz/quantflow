# Track Specification: 迁移数据模型管理页面 (无 Mock)

## 1. 目标
从旧设计成功迁移“数据模型”管理页面到新的 QuantFlow 项目。这涉及基于提供的截图完美复刻 UI，并立即实现支持的后端 API（不允许使用 Mock）。

## 2. 范围
### 前端 (React + Tailwind)
- **全局布局**:
  - 头部: Logo "EasyQuant Pro", 状态指示器 (在线, CPU, 内存), 语言切换, 主题切换。
  - 导航标签: "数据模型", "工作流任务", "系统监控"。
- **数据模型页面**:
  - **工具栏**: 搜索框, 分类下拉框, 状态下拉框, 分页摘要, "新建表" 按钮。
  - **数据表格**:
    - 列: 显示名称, 物理表名 (可复制), 分类 (标签样式), 状态 (带颜色圆点), 操作 (复制, 编辑, 删除)。
    - 行: 渲染从后端获取的真实数据。
    - 分页: 底部显示分页控件。

### 后端 (FastAPI + SQLAlchemy)
- **数据库模型**: `DataModel` 表，字段与 UI 匹配:
  - `display_name` (字符串)
  - `physical_table_name` (字符串)
  - `category` (枚举/字符串)
  - `status` (枚举: Published, Draft 等)
- **API 端点**:
  - `GET /api/v1/data-models`: 列表获取，支持分页、搜索和过滤。
  - `POST /api/v1/data-models`: 创建新模型。
  - `PUT /api/v1/data-models/{id}`: 更新模型。
  - `DELETE /api/v1/data-models/{id}`: 删除模型。

## 3. 技术栈与约束
- **前端**: React 18, Vite, TailwindCSS.
- **后端**: Python 3.10+, FastAPI, SQLAlchemy, PostgreSQL.
- **策略**: 前端驱动的复制与验证。
- **约束**: **禁止 Mock**。所有前端组件必须消费真实的 API。

## 4. 验收标准
- UI 在视觉上与提供的截图匹配。
- “数据模型”标签处于激活状态。
- 表格显示从数据库获取的真实数据。
- 点击“新建表”（即使目前只是一个占位符弹窗）能触发真实的 API 调用或为调用做准备。
- 过滤和分页功能与后端联动正常。