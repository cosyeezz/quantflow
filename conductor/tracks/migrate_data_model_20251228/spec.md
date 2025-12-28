# Track Specification: Migrate Data Model Management Page (No Mock)

## 1. Goal
To successfully migrate the "Data Model" management page from the legacy design to the new QuantFlow project. This involves recreating the UI pixel-perfectly based on the provided screenshot and implementing the supporting backend APIs immediately (no mocking allowed).

## 2. Scope
### Frontend (React + Tailwind)
- **Global Layout**:
  - Header: Logo "EasyQuant Pro", Status Indicators (Online, CPU, RAM), Language Switcher, Theme Switcher.
  - Navigation Tabs: "数据模型" (Data Model), "工作流任务" (Workflow Tasks), "系统监控" (System Monitor).
- **Data Model Page**:
  - **Toolbar**: Search bar, Category dropdown, Status dropdown, Pagination summary, "New Table" button.
  - **Data Table**:
    - Columns: Display Name, Physical Table Name (copyable), Category (Tag style), Status (with colored dot), Actions (Copy, Edit, Delete).
    - Rows: Render real data fetched from the backend.
    - Pagination: Bottom pagination controls.

### Backend (FastAPI + SQLAlchemy)
- **Database Model**: `DataModel` table with fields matching the UI:
  - `display_name` (string)
  - `physical_table_name` (string)
  - `category` (enum/string)
  - `status` (enum: Published, Draft, etc.)
- **API Endpoints**:
  - `GET /api/v1/data-models`: List models with pagination, search, and filtering.
  - `POST /api/v1/data-models`: Create a new model.
  - `PUT /api/v1/data-models/{id}`: Update a model.
  - `DELETE /api/v1/data-models/{id}`: Delete a model.

## 3. Tech Stack & Constraints
- **Frontend**: React 18, Vite, TailwindCSS.
- **Backend**: Python 3.10+, FastAPI, SQLAlchemy, PostgreSQL.
- **Strategy**: Frontend-Driven Copy & Verify.
- **Constraint**: **NO MOCKS**. All frontend components must consume real APIs.

## 4. Acceptance Criteria
- The UI matches the provided screenshot visually.
- The "Data Model" tab is active.
- Real data is fetched from the database and displayed in the table.
- Clicking "New Table" (even if just a placeholder modal for now) triggers a real API call or prepares for one.
- Filtering and Pagination work with the backend.
