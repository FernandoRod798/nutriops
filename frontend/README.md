# NutriOps — Fitness Coaching Platform

Web platform for fitness coaches to manage clients, assign training programs, routines, and nutrition plans.

## Live Demo

- Frontend: coming soon
- Backend API: coming soon

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui + Radix UI
- React Router DOM
- Lucide React

**Backend**
- Python + Flask
- SQLAlchemy ORM
- PostgreSQL
- Flask-CORS
- Gunicorn

## Architecture

### Frontend — Feature-based architecture

frontend/src/
├── features/
│   ├── clients/          # Everything related to clients
│   │   ├── components/   # ClientList, ClientForm, ClientDetail
│   │   ├── hooks/        # useClients
│   │   ├── services/     # clientService, clientProgramService
│   │   ├── types/        # Client, ClientProgram, Routine, Exercise, Meal
│   │   └── index.ts      # Public API of this feature
│   ├── programs/         # Everything related to programs
│   │   ├── hooks/        # usePrograms
│   │   ├── services/     # programService
│   │   ├── types/        # Program
│   │   └── index.ts
│   └── dashboard/        # Dashboard-specific components and hooks
├── shared/               # Shared across all features
│   └── hooks/            # useTheme
├── layouts/              # AppLayout, AppSidebar
├── pages/                # Route-level components
└── components/ui/        # shadcn/ui components