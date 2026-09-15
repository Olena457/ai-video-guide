



import random
from datetime import datetime, timedelta
from database import SessionLocal
import models

TASKS_DATA = [
    {
        "title": "Setup frontend project",
        "category": "Work",
        "description": "Initialize the Next.js repository, configure Tailwind CSS, set up the folder structure, and add initial configuration files for the linter and formatter."
    },
    {
        "title": "Fix navigation bug",
        "category": "Work",
        "description": "Investigate and resolve the issue where the mobile hamburger menu does not close after a user clicks on a link. Ensure animations are smooth and responsive."
    },
    {
        "title": "Review pull requests",
        "category": "Work",
        "description": "Go through pending PRs from the junior developers. Check for code quality, adherence to style guidelines, and ensure all tests are passing before merging."
    },
    {
        "title": "Update API documentation",
        "category": "Work",
        "description": "Document the newly added endpoints for user authentication and profile management using Swagger. Include detailed request and response examples."
    },
    {
        "title": "Buy groceries",
        "category": "Home",
        "description": "Restock the fridge with essential items for the week, including fresh vegetables, fruits, almond milk, whole grain bread, and lean protein sources."
    },
    {
        "title": "Call the bank",
        "category": "Personal",
        "description": "Contact customer support to inquire about the recent foreign transaction fees and ask about the process of upgrading the credit card to a premium tier."
    },
    {
        "title": "Schedule dentist appointment",
        "category": "Health",
        "description": "Call the dental clinic to book a routine check-up and teeth cleaning session for next week. Request an afternoon slot if possible to avoid morning traffic."
    },
    {
        "title": "Read a new tech book",
        "category": "Personal",
        "description": "Spend at least an hour reading the new book on advanced React patterns. Take comprehensive notes on custom hooks and state management strategies."
    },
    {
        "title": "Go to the gym",
        "category": "Health",
        "description": "Complete the upper body strength training routine, followed by 20 minutes of high-intensity interval training on the treadmill to improve cardiovascular endurance."
    },
    {
        "title": "Plan weekend trip",
        "category": "Personal",
        "description": "Research accommodation options, map out potential hiking trails, check the local weather forecast, and create a packing list for the upcoming mountain getaway."
    },
    {
        "title": "Pay utility bills",
        "category": "Home",
        "description": "Log into the online banking portal and settle the electricity, water, and high-speed internet bills before the due date to avoid any late fees or service interruptions."
    },
    {
        "title": "Clean the workspace",
        "category": "Home",
        "description": "Organize the desk, wipe down the monitors, throw away old sticky notes, and ensure a clutter-free environment to maintain better focus during working hours."
    },
    {
        "title": "Order dog food",
        "category": "Home",
        "description": "Purchase a 15kg bag of premium dry dog food from the online pet store. Check if there are any available discount codes or bulk offers before checking out."
    },
    {
        "title": "Learn Tailwind CSS tricks",
        "category": "Work",
        "description": "Watch a comprehensive video tutorial on advanced Tailwind CSS features, focusing primarily on CSS grid layouts, custom animations, and responsive design techniques."
    },
    {
        "title": "Deploy app to Next.js",
        "category": "Work",
        "description": "Push the latest approved commits to the main branch, trigger the Vercel deployment pipeline, and carefully verify that the production build is completely stable."
    }
]

def seed_data():
    db = SessionLocal()
    
    if db.query(models.Task).count() > 0:
        print("Database already contains tasks. Seeding skipped.")
        db.close()
        return
        
    print("Seeding database with 15 tasks...")
    
    for task_info in TASKS_DATA:
        future_days = random.randint(1, 30)
        random_date = (datetime.now() + timedelta(days=future_days)).strftime("%Y-%m-%d")
        
        due = random_date if random.random() > 0.2 else None

        new_task = models.Task(
            title=task_info["title"],
            description=task_info["description"],
            status=random.choice(["todo", "in_progress", "done", "undone"]),
            priority=random.randint(1, 10),
            category=task_info["category"],
            due_date=due  
        )
        db.add(new_task)
        
    db.commit()
    db.close()
    print("Database successfully seeded with detailed descriptions, categories, and statuses!")

if __name__ == "__main__":
    seed_data()


  