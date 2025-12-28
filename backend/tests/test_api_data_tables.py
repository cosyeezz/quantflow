
import pytest
from unittest.mock import AsyncMock, MagicMock
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.db.session import get_session

@pytest.mark.anyio
async def test_get_categories_empty():
    # Mock Session
    mock_session = AsyncMock()
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_session.execute.return_value = mock_result
    
    async def override_get_session():
        yield mock_session

    app.dependency_overrides[get_session] = override_get_session
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/categories")
    
    assert response.status_code == 200
    assert response.json() == []

@pytest.mark.anyio
async def test_create_data_table_endpoint():
    # Mock Session
    mock_session = AsyncMock()
    mock_session.add = MagicMock() # session.add is sync
    
    # Mocking check for existing table (scalar_one_or_none)
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_session.execute.return_value = mock_result
    
    # Mock refresh to set ID
    async def side_effect_refresh(obj):
        obj.id = 1
    mock_session.refresh.side_effect = side_effect_refresh

    async def override_get_session():
        yield mock_session

    app.dependency_overrides[get_session] = override_get_session
    
    payload = {
        "name": "Test Table",
        "table_name": "test_table",
        "category_id": 1,
        "description": "desc",
        "columns_schema": [{"name": "id", "type": "INT", "is_pk": True, "comment": "PK"}],
        "indexes_schema": []
    }
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/v1/data-tables", json=payload)
    
    if response.status_code != 200:
        print(response.json())
        
    assert response.status_code == 200
    # Verify add was called
    assert mock_session.add.called
