# RoleRaise - Interview Coaching Platform

## Overview

RoleRaise is a modern web application for interview coaching and career transformation services. It's built as a full-stack application with a React frontend and Express backend, designed to help tech professionals land high-paying roles through personalized coaching and mentorship. The site has been completely redesigned to match the Finance-able.com aesthetic with structured content sections and improved user experience.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Modern, clean design with light gray/white background and scattered geometric triangle elements, inspired by Finance-able website design.
Font preference: Lato from Google Fonts
Button style: Circular buttons with hover effects
Navigation: Circular dark navigation bar with Finance-able style hover effects
Animations: Floating geometric triangles with subtle animations

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement with Vite middleware

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/           # Express backend
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database abstraction layer
│   └── vite.ts       # Vite development setup
├── shared/           # Shared types and schemas
└── migrations/       # Database migrations
```

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Contact Submissions Table**: Stores form submissions with fields for name, email, role, experience, and salary information
- **Schema Validation**: Zod schemas for type-safe data validation using drizzle-zod

### Storage Layer
- **Interface-based Design**: IStorage interface for database operations
- **Memory Storage**: In-memory implementation for development/testing
- **Database Operations**: CRUD operations for users and contact submissions

### API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact-submissions` - Retrieve all submissions (admin)

### Frontend Components
- **Landing Page**: Hero section, problem/solution sections, mentor profiles
- **Contact Form**: Lead generation form with validation
- **Pricing Section**: Service tier presentation
- **Success Stories**: Customer testimonials and case studies

## Data Flow

1. **User Interaction**: Users interact with the React frontend
2. **Form Submission**: Contact forms are validated client-side with Zod schemas
3. **API Communication**: Frontend sends requests to Express backend
4. **Data Processing**: Backend validates and processes requests
5. **Database Operations**: Data is stored using Drizzle ORM
6. **Response**: Success/error responses sent back to frontend
7. **UI Updates**: Frontend updates based on API responses

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library

### Development Tools
- **TypeScript**: Type safety across the stack
- **Vite**: Build tool and development server
- **ESBuild**: Fast JavaScript bundler for production
- **Drizzle Kit**: Database migration tool

### Third-party Integrations
- **Calendly**: Meeting scheduling (configuration in client/src/lib/calendly.ts)
- **Google Sheets**: Form submission storage (client/src/lib/googleSheets.ts)
- **Replit**: Development environment with runtime error overlay

## Deployment Strategy

### Development
- **Hot Reload**: Vite middleware for instant updates
- **Type Checking**: TypeScript compilation without emit
- **Database**: Development uses memory storage, production uses PostgreSQL

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` script

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment detection (development/production)
- **CALENDLY_URL**: Calendly integration URL

The application is designed to be deployed on platforms like Replit, with specific configurations for development tooling and runtime error handling in the Replit environment.