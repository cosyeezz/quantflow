# QuantFlow: Visual Quant Strategy Orchestration

QuantFlow 是一个高性能的、基于节点图的可视化量化交易流程编排系统。它旨在填补复杂的 Python 策略代码与可视化管理之间的鸿沟，允许交易员和工程师通过直观的拖拽操作构建、监控和执行复杂的交易工作流。

## 核心架构 (Core Architecture)

### 1. 可视化工作流引擎 (Visual Workflow Engine)
QuantFlow 的核心是一个基于 React 的现代化画布（衍生自 Dify 的强健编辑器），支持：
- **拖拽式编排**: 通过直观的节点连接定义数据流向。
- **嵌套工作流**: 支持将复杂的逻辑封装为可复用的子工作流（Sub-workflow）。
- **实时监控**: 直接在图上可视化执行状态、数据传播路径和错误信息。

### 2. 高级调度模型 (Advanced Scheduling)
QuantFlow 超越了简单的线性执行，引入了容器化的调度概念：
- **进程调度器 (Process Scheduler)**: 将计算密集型子图包裹在独立的 OS 进程中运行，提供真正的并行计算能力和资源隔离。
- **线程调度器 (Thread Scheduler)**: 将 IO 密集型任务包裹在轻量级线程中，实现高并发数据抓取。

### 3. 事件驱动消息总线 (Event-Driven MQ)
内置的消息队列支持确保了系统的解耦与弹性：
- **全局 Topic**: 持久化的消息通道管理。
- **生产者/消费者节点**: 专门用于发布和订阅数据流的节点。
- **幽灵连线 (Ghost Edges)**: 在画布上自动绘制虚线以可视化隐式的 MQ 连接，保持逻辑清晰。

## 节点生态 (Node Ecosystem)

*   **ETL Nodes**: 数据清洗、转换、加载节点。
*   **Strategy Nodes**: 执行 Python 核心交易逻辑。
*   **Control Flow**: 条件判断 (If-Else)、循环 (Loop)、分支 (Switch)。
*   **System**: 触发器 (Trigger)、通知 (Notification)、日志 (Logger)。

## 技术栈 (Technology Stack)

*   **Frontend**: React 18, Vite, TailwindCSS
*   **Backend**: Python 3.10+, FastAPI, SQLAlchemy
*   **Runtime**: 自研异步图执行引擎 (Async Graph Runner)
*   **Infrastructure**: PostgreSQL (元数据), Redis (热数据/MQ)
