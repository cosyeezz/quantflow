
import pytest
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.postgresql import JSONB
import sqlalchemy.types as types

# Fix for JSONB in SQLite
from sqlalchemy.dialects.sqlite.base import SQLiteTypeCompiler
SQLiteTypeCompiler.visit_JSONB = lambda self, type_, **kw: "JSON"

from app.db.base_class import Base
from app.models.data_table import DataTableConfig, TableCategory, TableStatus
from app.schemas.data_table import DataTableCreate, ColumnDef

# Use in-memory SQLite for testing model definitions
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

@pytest.fixture(scope="function")
def db_session():
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

def test_table_category_model(db_session):
    cat = TableCategory(code="test_cat", name="Test Category", description="Desc")
    db_session.add(cat)
    db_session.commit()
    db_session.refresh(cat)
    assert cat.id is not None
    assert cat.code == "test_cat"

def test_data_table_config_model(db_session):
    cat = TableCategory(code="market_data", name="Market Data")
    db_session.add(cat)
    db_session.commit()

    table_config = DataTableConfig(
        category_id=cat.id,
        name="Test Table",
        table_name="test_table_phys",
        description="A test table",
        status=TableStatus.DRAFT,
        columns_schema=[{"name": "id", "type": "INT", "is_pk": True}],
        indexes_schema=[]
    )
    db_session.add(table_config)
    db_session.commit()
    db_session.refresh(table_config)
    
    assert table_config.id is not None
    assert table_config.table_name == "test_table_phys"
    assert table_config.status == TableStatus.DRAFT

def test_pydantic_schemas():
    col = ColumnDef(name="id", type="INT", is_pk=True, comment="PK")
    assert col.name == "id"
    
    dt_create = DataTableCreate(
        name="Test",
        table_name="test_phys",
        category_id=1,
        description="Desc",
        columns_schema=[col]
    )
    assert dt_create.table_name == "test_phys"
