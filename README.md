# TaskFlow - Full-Stack Task Manager

_A professional, full-stack task management application featuring an interactive Drag-and-Drop board. Designed as a monorepo, this project features a high-performance FastAPI backend and a responsive Next.js frontend, engineered for seamless task organization and productivity._



## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 18px;">

 
  <img src="/apps/frontend/public/task.jpg" width="30%" height="130px" style="object-fit: cover;" alt="Screenshot 2"/>
  <img src="/apps/frontend/public/edit.jpg" width="30%" height="130px" style="object-fit: cover;" alt="Screenshot 6"/>
  <img src="/apps/frontend/public/screen-2.jpg" width="30%" height="130px" style="object-fit: cover;" alt="Screenshot 3"/>
  <img src="/apps/frontend/public/screen-3.jpg" width="30%" height="130px" style="object-fit: cover;" alt="Screenshot 5"/>
  <img src="/apps/frontend/public/screen-4.jpg" width="30%" height="130px" style="object-fit: cover;" alt="Screenshot 4"/>
  <img src="/apps/frontend/public/welcom.jpg" width="30%" height="130px" style="object-fit: cover;" alt="Screenshot 1"/>


</div>

---

## Demo Video 

You can watch a short demo of application here:  
[Watch the video](https://drive.google.com/file/d/14mU10dz3xermBlF_yWyxt1_TC6fAgY_1/view?usp=sharing)


---

## Key Features

* **Interactive Board:** Built with `@hello-pangea/dnd`, allowing users to seamlessly move tasks across intuitive columns: **To Do**, **In Progress**, **Done**, and **Undone**.
* **Automated State Synchronization:** Dragging and dropping a task into a new column automatically triggers a backend update, rewriting and saving the new status in real-time without requiring page reloads.
* **Comprehensive Task Management (CRUD):** Easily create, read, update, and delete tasks with detailed inputs (title, description, due date, category, and priority).
* **Advanced Sorting & Filtering:**
  * **Sort tasks by:** Priority (Asc/Desc), Due Date, Status, Category, and Title.
  * **Filter tasks by:** Status and Category to maintain focus on specific workflows.
* **Interactive API Documentation (Swagger/OpenAPI):** Fully documented RESTful API with interactive UI available  via FastAPI at `/redoc`.
* **Responsive & Accessible UI:** Fully responsive design styled with Tailwind CSS, featuring seamless Light/Dark mode toggling (`next-themes`) and sleek toast notifications (`react-hot-toast`).

---

## Testing

The backend includes automated integration and regression tests powered by **Pytest** and FastAPI's `TestClient` to ensure API endpoints operate correctly and handle schema validation edge cases.

---

## Tech Stack & Architecture

This project follows a **Monorepo Architecture**, housing both the client and server codebases within a single repository to streamline development and deployment.

### Frontend (Client)
* **Framework:** Next.js (v16.2.10) & React (v19.2.4)
* **Styling:** Tailwind CSS v4
* **Drag & Drop:** `@hello-pangea/dnd`
* **Icons & Components:** Lucide React, React Datepicker
* **Deployment:** Hosted on **Vercel**

### Backend (Server)
* **Framework:** FastAPI (High-performance asynchronous Python framework)
* **ORM & Data Validation:** SQLAlchemy (v2.0) & Pydantic (v2.13)
* **Server:** Uvicorn
* **Deployment:** Hosted on **Render**

### Database Strategy
* **Local Development:** **SQLite** (Auto-generated locally for fast, configuration-free development and testing).
* **Production:** **PostgreSQL** hosted on **Neon** (Fully managed, scalable cloud database).

---

##  Getting Started

Follow these instructions to set up the project locally. 

### 1. Clone the Repository

```bash
git clone [https://github.com/USERNAME/REPOSITORY_NAME.git](https://github.com/USERNAME/REPOSITORY_NAME.git)
cd REPOSITORY_NAME
```


```bash
# Navigate to the backend directory
cd apps/backend
```

```bash
# Create a virtual environment
python -m venv venv
```
```bash
# Activate the virtual environment
# On Windows:
venv\Scripts\activate
```
```bash
# On macOS/Linux:
source venv/bin/activate
```
```bash
# Install dependencies
pip install -r requirements.txt
```
```bash
# Seed the local SQLite database with initial mock data
python seed.py
```
```bash
# Run the development server
uvicorn main:app --reload
```
```bash
# Navigate to the frontend directory from the project root
cd apps/frontend
```
```bash
# Install Node dependencies
npm install
```
```bash
# Start the development server
npm run dev

```

### Running Backend Tests

Navigate to the backend directory and run:

```bash
cd apps/backend
pytest

```

```
project-root/
└── apps/
    ├── backend/                   # FastAPI Application
    │   ├── main.py                # Application entry point
    │   ├── models.py              # SQLAlchemy database models
    │   ├── schemas.py             # Pydantic data validation schemas
    │   ├── database.py            # Database connection & engine setup
    │   ├── tasks.py               # API Routes (CRUD operations)
    │   ├── seed.py                # Script to populate the DB with initial data
    │   └── requirements.txt       # Python dependencies
    │
    └── frontend/                  # Next.js Application
        ├── app/                   # Next.js App Router (Pages & Layouts)
        │   ├── board/             # Interactive board view
        │   ├── tasks/             # Task details and management routes
        │   │   └── [id]/          # Dynamic route for specific task details
        │   ├── globals.css        # Global stylesheet
        │   ├── layout.tsx         # Root application layout
        │   └── page.tsx           # Main entry page
        ├── public/                # Static assets (images, icons, etc.)
        ├── src/                   # Application logic and UI elements
        │   ├── components/        # React components
        │   │   ├── common/        # Shared/reusable components
        │   │   ├── tasks/         # Task-specific components (Form, Item, etc.)
        │   │   └── ui/            # General UI elements
        │   ├── hooks/             # Custom React hooks
        │   │   ├── useTask.ts     # Hook for single task operations
        │   │   ├── useTaskForm.ts # Hook for managing form state
        │   │   └── useTasks.ts    # Hook for fetching and managing task list
        │   ├── types/             # TypeScript definitions and interfaces
        │   ├── utils/             # Helper functions
        │   │   └── task-utils.ts  # Utility logic for tasks
        │   └── api.ts             # API client and request configuration
        ├── .env                   # Environment variables
                                  
                                 
 ```