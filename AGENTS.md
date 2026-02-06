# AGENTS.md - Coding Guidelines for AI Agents

## Project Overview

Next.js 16 App Router project with React 19, TypeScript, Tailwind CSS v4, and Radix UI components. Built with v0.app and deployed on Vercel.

## Build & Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

**Note:** No test framework is currently configured. Consider adding Jest, Vitest, or Playwright for testing.

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode enabled** - Always use proper types, avoid `any`
- **Target:** ES6 with ESNext modules
- **Path alias:** Use `@/` for imports from project root (configured in tsconfig.json)

### Import Conventions

```typescript
// 1. React and Next.js imports first
import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'

// 2. Third-party library imports
import { motion } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

// 3. Internal imports with @/ alias
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
```

### Component Patterns

**Server Components (default):**
- No 'use client' directive
- Can fetch data directly
- Cannot use hooks or browser APIs

**Client Components:**
```typescript
'use client'

import { useState, useEffect } from 'react'
// Client-side logic here
```

**Component Structure:**
```typescript
// Use named exports for components
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  return <div>...</div>
}

// Or default export for page components
export default function Page() {
  return <main>...</main>
}
```

### Styling with Tailwind CSS v4

- Use `@import 'tailwindcss'` in globals.css (not directives)
- Use `cn()` utility from `@/lib/utils` for conditional classes:
  ```typescript
  className={cn('base-classes', condition && 'conditional-classes', className)}
  ```
- Use `class-variance-authority` (cva) for component variants
- Custom CSS variables defined in `:root` and `.dark`
- Theme tokens accessed via `var(--token-name)`

### Naming Conventions

- **Components:** PascalCase (e.g., `HeroSection`, `ButtonGroup`)
- **Files:** kebab-case for components (e.g., `hero-section.tsx`, `button-group.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useMobile`, `useToast`)
- **Types/Interfaces:** PascalCase with descriptive names
- **CSS Classes:** kebab-case (Tailwind handles this)

### Error Handling

- Use TypeScript strict types to catch errors at compile time
- For client components, use try-catch blocks for async operations
- Use Zod for runtime validation (already in dependencies)

### File Organization

```
app/              # Next.js App Router pages
components/       # React components
  ui/            # Base UI components (Radix-based)
  visualizations/ # Data visualization components
lib/             # Utility functions
public/          # Static assets
```

### Animation Guidelines

- Use Framer Motion for animations
- Prefer `motion.div` with `initial`, `animate`, `transition` props
- Use `useScroll` and `useTransform` for scroll-based animations
- Keep animations performant (use `transform` and `opacity`)

### Accessibility

- Use Radix UI primitives for accessible components
- Include proper ARIA attributes
- Support keyboard navigation
- Respect `prefers-reduced-motion` media query when possible

### Performance Best Practices

- Use Next.js Image component for optimized images
- Keep client components minimal - prefer server components
- Use `React.memo()` for expensive renders when needed
- Lazy load heavy components with `dynamic` imports

## Key Dependencies

- **Next.js 16** - App Router, Server Components
- **React 19** - Latest React features
- **TypeScript 5** - Strict type checking
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible primitives
- **Framer Motion** - Animations
- **Zod** - Schema validation
- **Lucide React** - Icons
