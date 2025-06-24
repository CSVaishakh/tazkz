# Tazkz

**Not the regular task manager**

Tazkz is a modern task management and note-taking application that reimagines productivity by combining tasks and thoughts in one unified interface. Built with Next.js 15, it offers a seamless experience for organizing your day, brainstorming ideas, and planning long-term goals.

## Features

### 🎯 Unified Task Management
- **Parent Tasks**: Create main tasks with comprehensive details including priority levels, deadlines, and status tracking
- **Child Tasks**: Break down complex tasks into manageable subtasks with individual progress tracking
- **Smart Organization**: Organize tasks by priority (low, medium, high) and status (started, ongoing, completed)
- **Task Editing**: Full CRUD operations with modal-based editing for both parent and child tasks

### 📝 Integrated Note-Taking
- Link notes directly to related tasks for contextual clarity
- Multi-line note support with automatic processing
- Add, edit, and remove notes dynamically
- No more jumping between apps - everything lives in one place

### 📊 Progress Tracking
- Visual progress bars for child tasks using interactive sliders (0-100%)
- Real-time progress updates with smooth animations
- Comprehensive dashboard with task overview
- Priority-based and deadline-based task sorting

### 🔐 Secure Authentication
- Powered by Clerk for secure user authentication
- Protected routes for dashboard, profile, and task management
- Seamless sign-in/sign-up experience with middleware protection

### 🎨 Modern UI/UX
- Built with shadcn/ui components and Tailwind CSS
- Responsive design that works on all devices
- Clean, minimalist interface designed to keep you focused
- Custom scrollbars and animated elements for enhanced user experience
- Green-themed color scheme with smooth transitions

### 📅 Smart Scheduling
- Date picker integration for task deadlines
- Calendar popover for easy date selection
- Past date warnings and validation
- Consistent date formatting across the application

## Tech Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom animations
- **Authentication**: Clerk with middleware protection
- **Database**: Supabase with PostgreSQL
- **Language**: TypeScript with strict type checking
- **Icons**: Lucide React icons
- **Date Handling**: Built-in date utilities

## Project Structure

```
tazkz/
├── app/                     # Next.js app directory
│   ├── api/                # API routes
│   │   └── tasks/          # Task management endpoints
│   │       └── [taskID]/   # Dynamic task routes
│   ├── about/              # About page with animated elements
│   ├── home/               # Landing page
│   ├── tasks/              # Task management pages
│   │   └── [taskID]/       # Individual task pages
│   ├── globals.css         # Global styles and theme configuration
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Homepage
├── components/             # Reusable React components
│   ├── ui/                 # shadcn/ui components
│   ├── editParentTask.tsx  # Parent task editing modal
│   ├── editChildTask.tsx   # Child task editing modal
│   ├── readParentTask.tsx  # Parent task creation form
│   ├── readChildTask.tsx   # Child task creation form
│   ├── header.tsx          # Navigation headers
│   └── footer.tsx          # Footer component
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
│   └── task.ts             # Task-related types and interfaces
├── public/                 # Static assets
├── middleware.ts           # Clerk authentication middleware
└── next.config.ts          # Next.js configuration
```

## Usage

### Creating Tasks

1. **Sign in** to your account using Clerk authentication
2. Navigate to the **Tasks** page
3. Click **"Add New Task"** to create a parent task
4. Fill in task details:
   - Name and description
   - Priority level (low, medium, high)
   - Status (started, ongoing, completed)
   - Optional deadline using the calendar picker
   - Notes for additional context

### Managing Child Tasks

1. From a parent task, click **"Add Child Task"**
2. Set up subtasks with:
   - Name and description
   - Progress tracking with slider (0-100%)
   - Individual deadlines
   - Task-specific notes

### Editing Tasks

- Click on any task to open the editing modal
- Modify task properties in real-time
- Add, edit, or remove notes dynamically
- Save changes with automatic validation

### Dashboard Overview

The dashboard provides:
- Overview of ongoing and completed tasks
- Tasks organized by priority and status
- Tasks sorted by deadline proximity
- Quick access to create and edit tasks
- Responsive design for all screen sizes

## Key Features in Detail

### Task Management
- **UUID Generation**: Automatic unique ID generation for all tasks
- **Status Tracking**: Visual indicators for task progress
- **Priority System**: Color-coded priority levels
- **Deadline Management**: Smart date handling with validation

### User Interface
- **Modal System**: Overlay modals for task creation and editing
- **Custom Scrollbars**: Styled scrollbars with green theme
- **Animations**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach with breakpoints

### Data Persistence
- **Supabase Integration**: Real-time database operations
- **Type Safety**: Full TypeScript support with proper typing
- **Error Handling**: Comprehensive error management
- **Data Validation**: Input validation and sanitization

## Type Safety

The project includes comprehensive TypeScript types:

- [`parentTask`](types/task.ts): Complete parent task structure
- [`childTask`](types/task.ts): Child task structure  
- [`status`](types/task.ts): Task status enumeration
- [`priority`](types/task.ts): Priority level enumeration

All components are fully typed with proper interfaces and props validation.

## Architecture

### Authentication Flow
- Protected routes using [`middleware.ts`](middleware.ts)
- Clerk integration for user management
- Automatic redirect handling

### Component Structure
- Reusable UI components from shadcn/ui
- Custom task components with full CRUD operations
- Header and footer components for consistent layout

### Styling System
- Tailwind CSS with custom configuration
- Green color theme throughout the application
- Custom animations and transitions
- Responsive breakpoints for all devices

## License

This project is private and not currently licensed for public use.
