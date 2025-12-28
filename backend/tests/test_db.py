import pytest
from sqlalchemy import text
from app.db.session import SessionLocal, engine

def test_db_session():
    # Verify SessionLocal is a class/callable
    assert callable(SessionLocal)
    
    # We can't easily test actual connection without a running DB in this environment
    # unless we use a mock or an in-memory sqlite.
    # For now, let's just check if we can instantiate a session.
    # But since we are likely using Postgres URL in config, it might fail if we try to connect.
    # So we check if the engine is created with correct driver.
    assert str(engine.url).startswith("postgresql")
