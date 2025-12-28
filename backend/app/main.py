from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.data_tables import router as data_tables_router
import uvicorn

app = FastAPI(title="EasyQuant Pro API")

# Configure CORS
origins = [
    "http://localhost:5173", # Vite dev server
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data_tables_router, prefix="/api/v1", tags=["data-tables"])

@app.get("/")
def read_root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
