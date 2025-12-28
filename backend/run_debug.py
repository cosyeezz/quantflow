
import uvicorn
import sys
import os

# Add current directory to path
sys.path.append(os.getcwd())

if __name__ == "__main__":
    try:
        print("Starting uvicorn...", flush=True)
        # Disable reload for debugging to keep it simple
        uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)
    except Exception as e:
        print(f"Failed to start uvicorn: {e}", flush=True)
        import traceback
        traceback.print_exc()
