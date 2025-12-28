
import uvicorn
import sys
import os

# Add current directory to path
sys.path.append(os.getcwd())

try:
    from app.main import app
    print("App imported successfully")
except Exception as e:
    print(f"Failed to import app: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

if __name__ == "__main__":
    try:
        print("Starting uvicorn...")
        uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
    except Exception as e:
        print(f"Failed to start uvicorn: {e}")
