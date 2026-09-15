from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_tasks():
    """Test retrieving the list of tasks (GET /tasks)"""
    response = client.get("/tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_task():
    """Test creating a new task with valid data (POST /tasks)"""
    new_task = {
        "title": "Test Task from Pytest",
        "description": "Testing FastAPI endpoint integration",
        "status": "todo",
        "priority": 2,          
        "category": "work"     
    }
    response = client.post("/tasks", json=new_task)
    
    assert response.status_code in [200, 201]
    data = response.json()
    assert data["title"] == "Test Task from Pytest"
    assert "id" in data

def test_invalid_task_creation():
    """Regression test: Ensure creation fails when required fields are missing"""
    invalid_task = {
        "description": "Missing title field"
    }
    response = client.post("/tasks", json=invalid_task)
    assert response.status_code == 422