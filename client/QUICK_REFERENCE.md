# Quick Reference Card

## 🚀 Essential Commands

```bash
# Navigate to project
cd client

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🌐 URLs

| Page | URL | Status |
|------|-----|--------|
| Home | http://localhost:3000 | ✅ Redirects |
| Invitation | http://localhost:3000/invitation | ✅ Complete |
| Device Check | http://localhost:3000/device-check | ✅ Complete |
| Rules | http://localhost:3000/rules | ✅ Complete |
| Lobby | http://localhost:3000/lobby | ✅ Complete |
| Interview | http://localhost:3000/interview | ⏳ TODO |
| Complete | http://localhost:3000/complete | ✅ Complete |

---

## 📂 Key File Locations

```
Common Tasks:

Add a page              → src/app/page-name/page.tsx
Add UI component        → src/components/ui/component.tsx
Add interview component → src/components/interview/component.tsx
Update state            → src/store/interview-store.ts
Add types               → src/types/interview.ts
Add mock data           → src/lib/mock-data.ts
Add utility function    → src/lib/utils.ts
Add custom hook         → src/hooks/use-hook-name.ts
```

---

## 🎨 Component Template

```tsx
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  className?: string
  // Add your props
}

export function Component({ className }: ComponentProps) {
  const [state, setState] = useState('')

  return (
    <div className={cn('base-classes', className)}>
      {/* Your JSX */}
    </div>
  )
}
```

---

## 📝 Page Template

```tsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function PageName() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Your content */}
      </div>
    </div>
  )
}
```

---

## 🗂️ State Management

### Interview Store
```tsx
import { useInterviewStore } from '@/store/interview-store'

// Get state
const currentQuestion = useInterviewStore(state => state.currentQuestion)
const aiState = useInterviewStore(state => state.aiState)

// Use actions
const setAIState = useInterviewStore(state => state.setAIState)
setAIState({ status: 'speaking', currentMessage: 'Hello!' })
```

### Settings Store
```tsx
import { useSettingsStore } from '@/store/settings-store'

// Get settings
const theme = useSettingsStore(state => state.theme)
const fontSize = useSettingsStore(state => state.fontSize)

// Update settings
const setTheme = useSettingsStore(state => state.setTheme)
setTheme('dark')
```

---

## 🎨 Common Tailwind Classes

```css
/* Layout */
.flex .items-center .justify-between
.grid .grid-cols-2 .gap-4
.min-h-screen .p-6

/* Spacing */
.p-6 .px-4 .py-2 .m-4 .mx-auto .mt-8 .mb-4
.gap-2 .gap-4 .gap-6 .space-y-4

/* Sizing */
.w-full .h-full .max-w-4xl .min-h-screen

/* Colors */
.bg-card .bg-primary .bg-muted
.text-foreground .text-muted-foreground
.border-border

/* Effects */
.rounded-lg .rounded-xl .shadow-md .shadow-lg
.hover:bg-accent .transition-all .duration-300

/* Typography */
.text-sm .text-base .text-lg .text-2xl .text-4xl
.font-medium .font-semibold .font-bold
.leading-relaxed

/* Dark Mode */
.dark:bg-card .dark:text-foreground
```

---

## 🔧 Utility Functions

```tsx
import { cn } from '@/lib/utils'
import { formatDuration, formatTime, formatDate } from '@/lib/utils'

// Combine classes
<div className={cn('base', 'classes', isActive && 'active')}>

// Format time
formatDuration(60) // "60 mins"
formatDuration(120) // "2 hours"
formatTime(125) // "2:05"
formatDate(new Date()) // "Friday, July 17, 2026 at 2:30 PM"
```

---

## 🎭 Common Icons

```tsx
import {
  Camera, Mic, Volume2, Wifi, Chrome,
  CheckCircle2, XCircle, AlertCircle,
  User, Briefcase, Building2, Clock, Bot,
  Home, Mail, Phone, Settings, HelpCircle,
  Play, Pause, Square, Loader2, RefreshCw
} from 'lucide-react'

<Camera className="h-5 w-5 text-primary" />
```

---

## 🎨 Color Palette

```tsx
/* Primary Colors */
bg-primary text-primary-foreground   // Blue
bg-secondary text-secondary-foreground // Gray
bg-success text-success-foreground   // Green
bg-warning text-warning-foreground   // Yellow
bg-error text-error-foreground       // Red

/* Neutral Colors */
bg-background    // Main background
bg-card          // Card background
bg-muted         // Muted background
text-foreground  // Main text
text-muted-foreground // Secondary text
border-border    // Border color
```

---

## 🎬 Animation Examples

```tsx
import { motion } from 'framer-motion'

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// Slide in from bottom
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// Scale in
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring' }}
>

// Pulse
<motion.div
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
>
```

---

## 🐛 Debugging

```tsx
// Log state
console.log('State:', useInterviewStore.getState())

// Check props
console.log('Props:', { prop1, prop2 })

// Network tab (F12 in browser)
// Check for API calls, errors

// React DevTools
// Install extension for component inspection
```

---

## 📊 Progress Tracking

### Pages: 5/7 Complete (71%)
✅ Invitation  
✅ Device Check  
✅ Rules  
✅ Lobby  
⏳ Interview (CRITICAL)  
✅ Complete  
⏳ Error Pages  

### Next Priority:
1. Main Interview Page
2. Top Bar Component
3. Controls Component
4. Info Panel Component
5. Settings Drawer

---

## 🎯 Quick Wins

### Add a New Rule to Rules Page
1. Open `src/lib/mock-data.ts`
2. Add to `interviewRules` array
3. Refresh page

### Change Theme Colors
1. Open `src/app/globals.css`
2. Modify CSS variables in `:root` or `.dark`
3. Refresh page

### Add a New Question
1. Open `src/lib/mock-data.ts`
2. Add to `sampleQuestions` array
3. Use in interview page

---

## 🆘 Common Issues & Fixes

### Port Already in Use
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found
```bash
# Reinstall dependencies
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Type Errors
```bash
# Check for errors
npm run type-check

# Fix by adding proper types
```

### Hot Reload Not Working
```bash
# Restart dev server
Ctrl+C
npm run dev
```

---

## 📚 Documentation Links

- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- Zustand: https://github.com/pmndrs/zustand
- Lucide Icons: https://lucide.dev/icons

---

## ✅ Pre-Deployment Checklist

- [ ] All pages working
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on different screen sizes
- [ ] Dark/Light mode working
- [ ] Camera/Microphone permissions work
- [ ] Interview flow works end-to-end
- [ ] Settings persist across refresh
- [ ] Error handling implemented

---

## 🎓 Code Style Guide

```tsx
// ✅ Good
const handleClick = () => {
  setState(newValue)
}

// ❌ Avoid
const handleClick = () => setState(newValue)

// ✅ Good - Destructure props
export function Component({ title, isActive }: Props) {

// ❌ Avoid - Props object
export function Component(props: Props) {

// ✅ Good - Early return
if (!data) return null

// ❌ Avoid - Nested conditions
if (data) {
  return <div>...</div>
}

// ✅ Good - cn() for classes
<div className={cn('base', isActive && 'active')}>

// ❌ Avoid - Template literals
<div className={`base ${isActive ? 'active' : ''}`}>
```

---

## 📞 Need Help?

1. Check `IMPLEMENTATION_GUIDE.md` for patterns
2. Check `INTERVIEW_LAYOUT.md` for visual specs
3. Check `PROJECT_STRUCTURE.md` for file locations
4. Check `PROGRESS_UPDATE.md` for current status
5. Review existing components for examples

---

**Keep this reference handy while developing! 📌**
