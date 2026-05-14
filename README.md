# NutriOps — Coaching Management API

REST API for fitness coaches to manage clients, assign training programs, routines, and nutrition plans.

## Tech Stack

- **Python** + **Flask** — web framework
- **SQLAlchemy** — ORM
- **PostgreSQL** — database
- **Flask-CORS** — cross-origin resource sharing
- **Gunicorn** — production server

## Architecture

backend/
├── app.py            # Application Factory
├── extensions.py     # SQLAlchemy instance
├── models.py         # Database models
├── routes/           # Blueprints organized by resource
│   ├── clients.py
│   ├── programs.py
│   ├── client_programs.py
│   ├── routines.py
│   ├── exercises.py
│   ├── nutrition_plans.py
│   └── meals.py

## Data Model

Client → ClientProgram ← Program
↓
Routine → Exercise
NutritionPlan → Meal

## Local Setup

```bash
# Clone the repository
git clone https://github.com/FernandoRod798/nutriops.git
cd nutriops/backend

# Create virtual environment
py -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Run the server
py app.py
```

## Environment Variables

DATABASE_URL=postgresql://user:password@localhost:5435/nutriops
FLASK_ENV=development
SECRET_KEY=your-secret-key

## API Reference

### Clients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /clients/ | List all clients |
| POST | /clients/ | Create a client |
| GET | /clients/:id | Get client detail |
| DELETE | /clients/:id | Delete a client |

### Programs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /programs/ | List all programs |
| POST | /programs/ | Create a program |
| GET | /programs/:id | Get program detail |
| DELETE | /programs/:id | Delete a program |

### Client Programs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /clients/:id/programs | Get client's programs |
| POST | /clients/:id/programs | Assign program to client |
| DELETE | /client-programs/:id | Remove assignment |

### Routines
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /client-programs/:id/routines | Get routines |
| POST | /client-programs/:id/routines | Create routine |
| DELETE | /routines/:id | Delete routine |

### Exercises
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /routines/:id/exercises | Add exercise |
| DELETE | /exercises/:id | Delete exercise |

### Nutrition Plans
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /client-programs/:id/nutrition-plans | Get plans |
| POST | /client-programs/:id/nutrition-plans | Create plan |
| DELETE | /nutrition-plans/:id | Delete plan |

### Meals
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /nutrition-plans/:id/meals | Add meal |
| DELETE | /meals/:id | Delete meal |

## Roadmap

- [ ] Deploy on Railway
- [ ] Frontend — React + TypeScript + shadcn/ui
- [ ] Coach authentication
- [ ] Client portal
- [ ] PDF export for client plans