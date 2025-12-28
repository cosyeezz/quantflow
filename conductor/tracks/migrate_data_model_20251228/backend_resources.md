# Backend Resources Analysis

## Source (Legacy Code)
- **API Logic:** `easyquant_old_code/server/api/v1/data_tables.py`
  - Contains routes for Categories and DataTables.
  - Contains Pydantic schemas (inline).
  - Contains logic for DDL generation calls and physical table management.
- **Data Model:** `easyquant_old_code/server/storage/models/data_table_config.py`
  - Defines `TableCategory` and `DataTableConfig`.
- **Utility:** `easyquant_old_code/server/storage/ddl_generator.py`
  - Handles SQL generation for PostgreSQL.

## Destination (New Project)
### Already Migrated (Phase 1)
- **Model:** `backend/app/models/data_table.py`
  - Verified: Matches legacy structure.
- **Schema:** `backend/app/schemas/data_table.py`
  - Verified: Contains Pydantic definitions.
- **Utility:** `backend/app/db/ddl_generator.py`
  - Verified: Logic ported.

### To Be Migrated (Phase 3)
- **API Endpoints:** `backend/app/api/data_tables.py` (New file needed)
  - Needs to adapt `Depends(get_session)` to new project patterns.
  - Needs to register with main router.
