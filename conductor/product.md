# Initial Concept

QuantFlow: Visual Quant Strategy Orchestration. A high-performance, node-graph based visual quantitative trading process orchestration system.

# Product Guide

## 1. 愿景与目标 (Vision & Goals)
QuantFlow 旨在弥合复杂的 Python 策略代码与可视化管理之间的鸿沟，主要服务于 **量化交易员**。
主要目标包括：
- **可视化编排**: 允许交易员通过直观的拖拽操作构建复杂的交易工作流，减少大量代码编写的需求。
- **实时监控**: 直接在图表上可视化执行状态、数据传播路径和错误信息。
- **高性能回测**: 提供针对历史数据的强大策略测试环境。

## 2. 核心功能 (Core Features)
- **丰富的节点生态**: 包含用于数据清洗的 ETL 节点、执行 Python 逻辑的策略节点以及控制流节点（循环、分支等）。
- **高级调度模型**: 采用容器化调度模型，包含用于并行计算的进程调度器 (Process Schedulers) 和用于高并发 IO 的线程调度器 (Thread Scheduler)。
- **事件驱动架构**: 内置消息队列 (MQ) 实现组件解耦，支持全局 Topic 和用于可视化隐式连接的幽灵连线 (Ghost Edges)。

## 3. 部署与架构 (Deployment & Architecture)
- **架构**: 前后端分离架构 (Web-based)。
- **用户体验/设计理念**: 一个现代化的、极简的低代码/无代码平台（灵感来源于 Dify 的画布），能够高效处理并展示交易指标等高密度数据。