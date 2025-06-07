# Tazkz

**Not the regular task manager**

Tazkz is a modern task management and note-taking application that reimagines productivity by combining tasks and thoughts in one unified interface. Built with Next.js, it offers a seamless experience for organizing your day, brainstorming ideas, and planning long-term goals.

## Features

### 🎯 Unified Task Management
- **Parent Tasks**: Create main tasks with comprehensive details including priority levels, deadlines, and status tracking
- **Child Tasks**: Break down complex tasks into manageable subtasks with progress tracking
- **Smart Organization**: Organize tasks by priority (low, medium, high) and status (started, ongoing, completed)

### 📝 Integrated Note-Taking
- Link notes directly to related tasks for contextual clarity
- No more jumping between apps - everything lives in one place
- Rich text support for detailed documentation

### 📊 Progress Tracking
- Visual progress bars for child tasks using interactive sliders
- Comprehensive dashboard with task overview
- Priority-based and deadline-based task sorting

### 🔐 Secure Authentication
- Powered by Clerk for secure user authentication
- Protected routes for dashboard, profile, and task management
- Seamless sign-in/sign-up experience

### 🎨 Modern UI/UX
- Built with shadcn/ui components and Tailwind CSS
- Responsive design that works on all devices
- Clean, minimalist interface designed to keep you focused
- Animated elements for enhanced user experience

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom animations
- **Authentication**: Clerk
- **Database**: Supabase
- **Language**: TypeScript
- **State Management**: React hooks

## Project Structure

```
tazkz/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── tasks/         # Task management endpoints
│   ├── dashboard/         # Dashboard page
│   ├── tasks/            # Task management pages
│   ├── profile/          # User profile
│   ├── home/             # Landing page
│   └── about/            # About page
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── readParentTask.tsx # Parent task creation form
│   ├── readChildTask.tsx  # Child task creation form
│   └── zeroTasks.tsx     # Empty state component
├── lib/                  # Utility functions
│   ├── utils.ts          # General utilities
│   └── supabase.ts       # Database client
├── types/                # TypeScript type definitions
│   └── task.ts           # Task-related types
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, pnpm, or bun
- Supabase account and project
- Clerk account for authentication

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tazkz.git
cd tazkz
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up your database schema in Supabase:
```sql
-- Parent tasks table
CREATE TABLE parent_tasks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('started', 'ongoing', 'completed')),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  deadline TEXT,
  childTasks TEXT[],
  notes TEXT[]
);

-- Child tasks table
CREATE TABLE child_tasks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  progress TEXT,
  deadline TEXT,
  parentTask TEXT NOT NULL,
  notes TEXT[]
);
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating Tasks

1. **Sign in** to your account
2. Navigate to the **Tasks** page
3. Click **"Add New Task"** to create a parent task
4. Fill in task details:
   - Name and description
   - Priority level (low, medium, high)
   - Status (started, ongoing, completed)
   - Optional deadline using the date picker
   - Notes for additional context

### Managing Child Tasks

1. When creating a parent task, click **"Add Child Task"**
2. Set up subtasks with:
   - Name and description
   - Progress tracking (0-100%)
   - Individual deadlines
   - Task-specific notes

### Dashboard Overview

The dashboard provides:
- Overview of ongoing and completed tasks
- Tasks organized by priority
- Tasks sorted by deadline proximity
- Quick access to create new tasks

## Type Safety

The project includes comprehensive TypeScript types:

- [`parentTask`](types/task.ts): Complete parent task structure
- [`childTask`](types/task.ts): Child task structure
- [`status`](types/task.ts): Task status enumeration
- [`priority`](types/task.ts): Priority level enumeration

Type guards [`isParentTask`](types/task.ts) and [`isChildTask`](types/task.ts) ensure runtime type safety.

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is private and not currently licensed for public use.
