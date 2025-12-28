from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field, field_validator, ConfigDict
from app.models.data_table import TableStatus

class ColumnDef(BaseModel):
    name: str = Field(..., pattern="^[a-z_][a-z0-9_]*$")
    type: str
    is_pk: bool = False
    comment: str

class IndexDef(BaseModel):
    name: str
    columns: List[str]
    unique: bool = False

class DataTableCreate(BaseModel):
    name: str
    table_name: str = Field(..., pattern="^[a-z_][a-z0-9_]*$")
    category_id: int
    description: str
    columns_schema: List[ColumnDef]
    indexes_schema: List[IndexDef] = []
    
    @field_validator('indexes_schema')
    @classmethod
    def validate_indexes(cls, v, info):
        # 校验索引字段是否存在于 columns_schema 中
        # info.data contains other fields
        if not info.data or 'columns_schema' not in info.data:
            return v
        
        col_names = {c.name for c in info.data['columns_schema']}
        for idx in v:
            for col in idx.columns:
                if col not in col_names:
                    raise ValueError(f"索引字段 '{col}' 未在列定义中找到")
        return v

class DataTableUpdate(DataTableCreate):
    pass

class DataTableResponse(BaseModel):
    id: int
    name: str
    table_name: str
    category_id: int
    description: str
    status: TableStatus
    last_published_at: Any | None = None
    columns_schema: List[Dict[str, Any]]
    indexes_schema: List[Dict[str, Any]]
    created_at: Any
    updated_at: Any

    model_config = ConfigDict(from_attributes=True)

class CategoryResponse(BaseModel):
    id: int
    code: str
    name: str
    description: str | None

    model_config = ConfigDict(from_attributes=True)

class CategoryCreate(BaseModel):
    code: str = Field(..., pattern="^[a-z0-9_]+$", description="唯一标识代码")
    name: str = Field(..., description="显示名称")
    description: str | None = None

class CategoryUpdate(BaseModel):
    name: str
    description: str | None = None

class DataTableListResponse(BaseModel):
    total: int
    items: List[DataTableResponse]
