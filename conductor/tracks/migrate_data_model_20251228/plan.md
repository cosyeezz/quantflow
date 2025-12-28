# Track Plan: Migrate Data Model Management Page (No Mock)

## Phase 1: Project Scaffolding & Infrastructure
- [ ] Task: Initialize Project Structure
    - Create the root directory structure for `frontend` (Vite) and `backend` (FastAPI).
    - Set up `frontend/package.json` with React, Tailwind, Axios/Query.
    - Set up `backend/pyproject.toml` (or requirements.txt) with FastAPI, SQLAlchemy, Pydantic, Uvicorn.
    - Configure a basic `docker-compose.yml` to spin up PostgreSQL and Redis.
- [ ] Task: Backend Core Setup
    - Implement database connection logic (`backend/app/db/session.py`).
    - Create the base SQLAlchemy model class.
    - Configure CORS in FastAPI to allow frontend requests.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Backend Implementation (API First)
- [ ] Task: Define Data Model Schema
    - Create SQLAlchemy model `DataModel` in `backend/app/models/`.
    - Create Pydantic schemas (`DataModelCreate`, `DataModelRead`) in `backend/app/schemas/`.
- [ ] Task: Implement CRUD Endpoints
    - Create API router in `backend/app/api/v1/endpoints/data_models.py`.
    - Implement `GET /` (List) with pagination params.
    - Implement `POST /` (Create).
    - Implement `DELETE /` and `PUT /`.
- [ ] Task: Register Routes & Verify
    - Include the router in the main FastAPI app.
    - Add a script or test to insert seed data (essential for UI verification since we can't mock).
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Frontend Layout & Components
- [ ] Task: Global Layout Implementation
    - Create `MainLayout` component.
    - Implement the Header (Logo, Status placeholders, Theme toggle).
    - Implement the Navigation Tabs (Visual only, simple switching logic).
- [ ] Task: API Client Setup
    - Configure Axios instance with base URL.
    - Create `api/dataModels.ts` service methods.
- [ ] Task: Data Model Page - Structure & Toolbar
    - Create `DataModelPage` component.
    - Implement the Search Bar and Filter Dropdowns (UI only first).
    - Implement the "New Table" button style.
- [ ] Task: Data Model Page - Data Table Integration
    - Implement the Table component using Tailwind.
    - **Integration**: Fetch data from `GET /api/v1/data-models` and render rows.
    - Map API status fields to UI colors (e.g., "Published" -> Green dot).
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Polish & Refinement
- [ ] Task: Pagination Integration
    - Connect UI pagination controls to API pagination parameters.
- [ ] Task: Copy to Clipboard Interaction
    - Implement the copy functionality for the "Physical Table Name" column.
- [ ] Task: Final UI Polish
    - Verify fonts, spacing, and colors against the screenshot.
    - Ensure "Strict Standards" (Linting/Types) are met.
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
