# Implementation Guide

## Quick Start

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
npm start
```

## File Structure

```
client/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home (redirects to invitation)
│   │   ├── providers.tsx             # Theme provider
│   │   ├── globals.css               # Global styles
│   │   ├── invitation/               # Invitation landing page
│   │   ├── device-check/             # Device testing page [TODO]
│   │   ├── rules/                    # Interview rules page [TODO]
│   │   ├── lobby/                    # Interview lobby [TODO]
│   │   ├── interview/                # Main interview page [TODO]
│   │   ├── complete/                 # Interview complete [TODO]
│   │   └── error/                    # Error pages [TODO]
│   │
│   ├── components/
│   │   ├── ui/                       # Base UI components (shadcn/ui pattern)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── spinner.tsx
│   │   │   └── dialog.tsx
│   │   │
│   │   ├── shared/                   # Shared components
│   │   │   ├── status-indicator.tsx
│   │   │   └── waveform-animation.tsx
│   │   │
│   │   ├── interview/                # Interview-specific components
│   │   │   ├── ai-avatar.tsx
│   │   │   ├── video-preview.tsx
│   │   │   ├── question-display.tsx
│   │   │   ├── transcript-panel.tsx
│   │   │   ├── top-bar.tsx          # [TODO]
│   │   │   ├── controls.tsx         # [TODO]
│   │   │   ├── info-panel.tsx       # [TODO]
│   │   │   └── settings-drawer.tsx  # [TODO]
│   │   │
│   │   └── device-check/             # Device testing components [TODO]
│   │
│   ├── lib/
│   │   ├── utils.ts                  # Utility functions
│   │   └── mock-data.ts              # Mock interview data
│   │
│   ├── store/                        # Zustand stores
│   │   ├── interview-store.ts        # Interview state
│   │   ├── settings-store.ts         # User settings
│   │   └── theme-store.ts            # Theme management
│   │
│   ├── hooks/                        # Custom React hooks [TODO]
│   │   ├── use-media-devices.ts
│   │   ├── use-speech-recognition.ts
│   │   ├── use-interview.ts
│   │   └── use-connection-monitor.ts
│   │
│   └── types/                        # TypeScript types
│       ├── interview.ts
│       └── index.ts
│
├── public/                           # Static assets
│   └── company-logo.png              # [TODO]
│
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── package.json
└── README.md
```

## Component Development Guidelines

### 1. UI Components (shadcn/ui pattern)

All UI components should follow this pattern:

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('base-classes', variantClasses[variant], className)}
        {...props}
      />
    )
  }
)
Component.displayName = 'Component'

export { Component }
```

### 2. Page Components

Pages should be client components when they need state or effects:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PageName() {
  const router = useRouter()
  
  // Your page logic
  
  return (
    <div className="min-h-screen">
      {/* Your page content */}
    </div>
  )
}
```

### 3. Interview Components

Interview-specific components should use the interview store:

```tsx
'use client'

import { useInterviewStore } from '@/store/interview-store'

export function InterviewComponent() {
  const { currentQuestion, aiState } = useInterviewStore()
  
  // Your component logic
  
  return (
    <div>
      {/* Your component content */}
    </div>
  )
}
```

## State Management (Zustand)

### Interview Store Usage

```tsx
import { useInterviewStore } from '@/store/interview-store'

function Component() {
  // Select specific state
  const currentQuestion = useInterviewStore(state => state.currentQuestion)
  const setAIState = useInterviewStore(state => state.setAIState)
  
  // Use actions
  const handleSomething = () => {
    setAIState({ status: 'speaking', currentMessage: 'Hello!' })
  }
}
```

### Settings Store Usage

```tsx
import { useSettingsStore } from '@/store/settings-store'

function Component() {
  const theme = useSettingsStore(state => state.theme)
  const setTheme = useSettingsStore(state => state.setTheme)
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
}
```

## Styling Guidelines

### 1. Use Tailwind Classes

```tsx
// Good
<div className="flex items-center gap-4 p-6 rounded-lg bg-card">

// Avoid custom CSS when possible
```

### 2. Use cn() for Conditional Classes

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  variant === 'primary' && 'primary-classes',
  className
)}>
```

### 3. Responsive Design

```tsx
<div className="
  w-full 
  md:w-1/2 
  lg:w-1/3
  px-4 
  md:px-6 
  lg:px-8
">
```

## Animation Guidelines

### 1. Framer Motion for Complex Animations

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
```

### 2. CSS Animations for Simple Effects

```tsx
<div className="animate-pulse">
<div className="transition-all duration-300 hover:scale-105">
```

### 3. Respect Reduced Motion

Already handled in `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] ARIA labels for icons and buttons
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Color contrast meets WCAG AA standards
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Loading states are communicated
- [ ] Skip navigation links where appropriate

## Testing Checklist

### Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)

### Device Testing
- [ ] Desktop (1920x1080, 1366x768)
- [ ] Tablet (iPad, Surface)
- [ ] Mobile (show "desktop recommended" message)

### Feature Testing
- [ ] Camera permission and preview
- [ ] Microphone permission and testing
- [ ] Speaker audio playback
- [ ] Internet connection monitoring
- [ ] Theme switching (Light/Dark)
- [ ] Settings persistence
- [ ] Interview flow progression
- [ ] Connection recovery
- [ ] Error handling

## API Integration Points

When connecting to a real backend, update these areas:

### 1. Invitation Data
Replace `mockInterviewInvitation` in `src/lib/mock-data.ts` with API call.

### 2. Interview Session
Initialize session from API response instead of mock data.

### 3. Question Streaming
Implement WebSocket or SSE for real-time AI questions.

### 4. Speech Recognition
Integrate with speech-to-text service (e.g., Web Speech API, Google Speech-to-Text).

### 5. Response Submission
Send candidate responses to backend for AI processing.

### 6. Progress Tracking
Sync interview progress with backend.

## Performance Optimization

### 1. Code Splitting
Already handled by Next.js App Router.

### 2. Image Optimization
Use Next.js Image component:

```tsx
import Image from 'next/image'

<Image
  src="/company-logo.png"
  alt="Company"
  width={100}
  height={100}
/>
```

### 3. Lazy Loading
For heavy components:

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <Spinner />,
})
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

```bash
npm run build
# Deploy the .next folder and package.json
```

## Environment Variables

Create `.env.local` for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_WS_URL=wss://api.example.com
```

Access in code:

```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

## Troubleshooting

### Issue: Hydration Errors
**Solution**: Ensure server and client render the same initial HTML. Use `suppressHydrationWarning` on `<html>` tag if needed.

### Issue: Camera/Microphone Not Working
**Solution**: Ensure HTTPS in production. Browser security requires secure context for media devices.

### Issue: Theme Not Persisting
**Solution**: Check Zustand persist middleware is configured correctly.

### Issue: Build Errors
**Solution**: Run `npm run type-check` to identify TypeScript errors.

## Support

For questions or issues:
1. Check the `PROJECT_STRUCTURE.md` for component locations
2. Review the `README.md` for feature overview
3. Consult Next.js documentation: https://nextjs.org/docs
4. Check Tailwind CSS documentation: https://tailwindcss.com/docs
