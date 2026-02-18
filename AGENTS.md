# AGENTS.md

## Development Commands

### Build & Development
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing
No test framework is currently configured. When adding tests, check package.json for the appropriate test command.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components (both page sections and shadcn/ui components)
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and data (e.g., speakers, schedule)
- `types/` - TypeScript type definitions
- `public/` - Static assets (images, fonts, etc.)

## Code Style Guidelines

### Imports
- External libraries first, then internal modules
- Use `@/` alias for internal imports:
  - Components: `@/components/component-name`
  - Utils: `@/lib/utils`
  - Hooks: `@/hooks/hook-name`
- React imports: `import * as React from 'react'`
- Type-only imports use `import type` where possible

### TypeScript
- Strict mode is enabled in tsconfig.json
- Use explicit type annotations for function parameters and return types
- Component props interfaces: `interface Props { ... }` or `type Props = { ... }`
- Use Readonly for immutable props: `Readonly<{ children: React.ReactNode }>`
- Generic event types: `React.FormEvent`, `React.ChangeEvent<HTMLInputElement>`, etc.
- Path aliases: `@/*` maps to project root

### Naming Conventions
- Components: PascalCase (e.g., `RegistrationSection`, `ThemeProvider`)
- Functions/Variables: camelCase (e.g., `cn`, `useIsMobile`, `handleSubmit`)
- Constants: SCREAMING_SNAKE_CASE for config (e.g., `MOBILE_BREAKPOINT`)
- Files: kebab-case (e.g., `registration-section.tsx`, `use-mobile.ts`)

### Component Patterns
- Client components MUST start with `'use client'` directive at the very top
- Use functional components with hooks
- Export components as named exports: `export function ComponentName() { ... }`
- For re-exports: `export { ComponentName }` or `export default ComponentName`

### Styling (Tailwind CSS)
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Utility class order: spacing → layout → sizing → typography → colors → effects
- Responsive design: `className="md:text-xl"` (mobile-first approach)
- Use class-variance-authority (cva) for component variants (see button.tsx)
- Custom CSS variables via Tailwind: `var(--font-display)`, etc.

### React Patterns
- State management with `useState`, `useEffect`, `useMemo`, `useCallback` as needed
- Animations: Use `framer-motion` with `<motion.div>` components
- Forms: Controlled components with `value` and `onChange`
- shadcn/ui components from @radix-ui primitives

### Error Handling
- Validate form inputs with `required` attribute
- Use try/catch for async operations
- Provide user feedback via alerts or toast notifications (Sonner available)

### UI Components (shadcn/ui)
- Components located in `components/ui/`
- Use Radix UI primitives with accessible patterns
- Follow the "new-york" style variant
- Use Lucide icons: `import { IconName } from 'lucide-react'`

### Formatting & Linting
- 2 space indentation
- No trailing semicolons
- Single quotes for strings
- Max line length: typically 80-100 characters
- Always run `npm run lint` after making changes to verify code quality

### Accessibility
- Use semantic HTML elements (`section`, `main`, `nav`, etc.)
- All inputs must have associated labels (`htmlFor` + `id`)
- Images must have `alt` text
- Keyboard navigation support via Radix UI components

### Performance
- Image optimization: Use `next/image` with explicit width/height or `fill`
- Code splitting: Next.js handles this automatically
- Dynamic imports for heavy components if needed

### Internationalization
- The project uses `next-intl` for i18n support
- Language: Spanish (`lang="es"` in root layout)

## Notes
- This is a Next.js 16 project with React 19
- TypeScript strict mode is enabled
- Uses Tailwind CSS v4 with custom design tokens
- shadcn/ui components are pre-installed and ready to use
- Framer Motion is available for animations
