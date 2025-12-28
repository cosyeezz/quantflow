from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_cors_middleware():
    # Check if CORS middleware is added
    # This is a bit internal, but we can check if the middleware stack includes CORSMiddleware
    from fastapi.middleware.cors import CORSMiddleware
    
    middlewares = [m.cls for m in app.user_middleware]
    assert CORSMiddleware in middlewares

def test_read_main():
    # Just a basic health check if we add one, or 404 if empty
    response = client.get("/")
    assert response.status_code in [200, 404]
