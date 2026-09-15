from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List

from database import get_db
import models
import schemas 

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@router.get("", response_model=List[schemas.TaskResponse])
def get_tasks(
    search: Optional[str] = None,
    status: Optional[str] = Query("all", description="Filter by status"),
    category: Optional[str] = Query(None, description="Filter by category"), 
    sort: Optional[str] = Query(None, description="Sorting options"),
    db: Session = Depends(get_db)
):
    query = db.query(models.Task)

    if search:
        query = query.filter(
            (models.Task.title.ilike(f"%{search}%")) | 
            (models.Task.description.ilike(f"%{search}%"))
        )

    if status and status != "all":
        query = query.filter(models.Task.status == status)

    if category:
        query = query.filter(models.Task.category == category)

    if sort:
        if sort == "priority_asc":
            query = query.order_by(models.Task.priority.asc())
        elif sort == "priority_desc":
            query = query.order_by(models.Task.priority.desc())
        elif sort == "date_asc":
            query = query.order_by(models.Task.due_date.asc())
        elif sort == "date_desc":
            query = query.order_by(models.Task.due_date.desc())
        elif sort == "status_asc":
            query = query.order_by(models.Task.status.asc())
        elif sort == "category_asc":
            query = query.order_by(models.Task.category.asc())
        elif sort == "title_asc":
            query = query.order_by(models.Task.title.asc())

    return query.all()

@router.post("", response_model=schemas.TaskResponse)
def create_task(task_in: schemas.TaskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(
        title=task_in.title,
        description=task_in.description,
        status=task_in.status,
        priority=task_in.priority,
        category=task_in.category,
        due_date=task_in.due_date  
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.patch("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_in: schemas.TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task_in.title is not None:
        task.title = task_in.title
    if task_in.description is not None:
        task.description = task_in.description
    if task_in.status is not None:
        task.status = task_in.status
    if task_in.priority is not None:
        task.priority = task_in.priority
    if task_in.category is not None:
        task.category = task_in.category
    if task_in.due_date is not None:        
        task.due_date = task_in.due_date    

    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return {"detail": "Task deleted successfully"}

@router.get("/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task