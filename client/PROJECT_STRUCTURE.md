# Evalyn AI - Client Application Structure

This document outlines the complete structure and components needed for the candidate interview application.

## ✅ Already Created

### Configuration Files
- ✅ `next.config.js` - Next.js configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tailwind.config.ts` - Tailwind CSS configuration
- ✅ `postcss.config.js` - PostCSS configuration
- ✅ `package.json` - Dependencies and scripts
- ✅ `.eslintrc.json` - ESLint configuration
- ✅ `.gitignore` - Git ignore rules

### Core Application
- ✅ `src/app/layout.tsx` - Root layout with Inter font
- ✅ `src/app/providers.tsx` - Theme provider
- ✅ `src/app/globals.css` - Global styles with dark mode
- ✅ `src/app/page.tsx` - Home page (redirects to invitation)

### Types
- ✅ `src/types/interview.ts` - All TypeScript interfaces
- ✅ `src/types/index.ts` - Type exports

### Stores (Zustand)
- ✅ `src/store/settings-store.ts` - User settings management
- ✅ `src/store/interview-store.ts` - Interview state management
- ✅ `src/store/theme-store.ts` - Theme management

### Utilities
- ✅ `src/lib/utils.ts` - Helper functions
- ✅ `src/lib/mock-data.ts` - Mock interview data

### UI Components (shadcn/ui pattern)
- ✅ `src/components/ui/button.tsx`
- ✅ `src/components/ui/card.tsx`
- ✅ `src/components/ui/input.tsx`
- ✅ `src/components/ui/select.tsx`
- ✅ `src/components/ui/badge.tsx`
- ✅ `src/components/ui/progress.tsx`
- ✅ `src/components/ui/switch.tsx`
- ✅ `src/components/ui/spinner.tsx`
- ✅ `src/components/ui/dialog.tsx`

### Shared Components
- ✅ `src/components/shared/status-indicator.tsx`
- ✅ `src/components/shared/waveform-animation.tsx`

### Interview Components
- ✅ `src/components/interview/ai-avatar.tsx` - Animated AI interviewer
- ✅ `src/components/interview/video-preview.tsx` - Candidate camera preview
- ✅ `src/components/interview/question-display.tsx` - Question display with animations
- ✅ `src/components/interview/transcript-panel.tsx` - Live transcription

### Pages
- ✅ `src/app/invitation/page.tsx` - Invitation landing page

## 📝 Components Still Needed

### Pages (Complete Interview Flow)

1. **Device Check Page** - `src/app/device-check/page.tsx`
   - Camera test with preview
   - Microphone test with audio level indicator
   - Speaker test with audio playback
   - Internet speed test
   - Browser compatibility check
   - Continue button when all checks pass

2. **Interview Rules Page** - `src/app/rules/page.tsx`
   - Display company interview rules
   - Checkbox for each rule acceptance
   - Privacy policy acceptance
   - Continue button (disabled until all accepted)

3. **Interview Lobby Page** - `src/app/lobby/page.tsx`
   - Professional waiting room UI
   - Candidate information display
   - AI interviewer introduction
   - Countdown timer (optional)
   - Ready button to begin

4. **Main Interview Page** - `src/app/interview/page.tsx`
   - Three-column layout:
     - LEFT: AI Avatar + Current Question
     - CENTER: Candidate video preview
     - RIGHT: Interview information panel
   - Top navigation with progress
   - Bottom controls (mute, camera, settings, help, end)
   - Live transcript panel
   - Connection status monitoring

5. **Interview Complete Page** - `src/app/complete/page.tsx`
   - Success message
   - Submission confirmation
   - Thank you message
   - Next steps (if provided)
   - Close button

6. **Error Pages**
   - `src/app/error/camera/page.tsx` - Camera unavailable
   - `src/app/error/microphone/page.tsx` - Microphone unavailable
   - `src/app/error/connection/page.tsx` - Network issues
   - `src/app/error/browser/page.tsx` - Unsupported browser
   - `src/app/error/expired/page.tsx` - Interview expired

### Interview Components

7. **Interview Top Bar** - `src/components/interview/top-bar.tsx`
   - Company logo
   - Interview progress bar
   - Elapsed time
   - Estimated time remaining
   - Connection status
   - Recording indicator

8. **Interview Controls** - `src/components/interview/controls.tsx`
   - Mute button
   - Camera toggle
   - Settings button
   - Report issue button
   - End interview button

9. **Interview Info Panel** - `src/components/interview/info-panel.tsx`
   - Current stage display
   - Stage progress
   - Interview tips (if allowed)
   - Stage descriptions

10. **Settings Drawer** - `src/components/interview/settings-drawer.tsx`
    - Theme selector (Light/Dark/System)
    - Font size selector
    - Camera device selector
    - Microphone device selector
    - Speaker device selector
    - Audio volume slider
    - Language selector
    - Accessibility options

11. **Connection Recovery Modal** - `src/components/interview/connection-recovery.tsx`
    - Connection status
    - Reconnection progress
    - Manual retry button
    - Help information

### Device Check Components

12. **Camera Test Card** - `src/components/device-check/camera-test.tsx`
13. **Microphone Test Card** - `src/components/device-check/microphone-test.tsx`
14. **Speaker Test Card** - `src/components/device-check/speaker-test.tsx`
15. **Internet Test Card** - `src/components/device-check/internet-test.tsx`

### Additional UI Components

16. **Slider** - `src/components/ui/slider.tsx` - For volume control
17. **Toast/Notification** - `src/components/ui/toast.tsx` - For notifications
18. **Drawer** - `src/components/ui/drawer.tsx` - For settings panel
19. **Textarea** - `src/components/ui/textarea.tsx` - For text input

### Custom Hooks

20. **useMediaDevices** - `src/hooks/use-media-devices.ts`
    - Enumerate cameras, microphones, speakers
    - Request permissions
    - Handle device changes

21. **useSpeechRecognition** - `src/hooks/use-speech-recognition.ts`
    - Real-time speech-to-text
    - Handle interim and final results
    - Manage recognition state

22. **useInterview** - `src/hooks/use-interview.ts`
    - Manage interview flow
    - Handle question transitions
    - Track progress

23. **useConnectionMonitor** - `src/hooks/use-connection-monitor.ts`
    - Monitor internet connection
    - Detect disconnections
    - Trigger reconnection

## Implementation Priority

### Phase 1: Core Interview Flow (High Priority)
1. Device Check Page
2. Interview Rules Page
3. Interview Lobby Page
4. Main Interview Page
5. Interview Complete Page

### Phase 2: Components & Features (Medium Priority)
6. Settings Drawer
7. Connection Recovery
8. All device check components
9. Custom hooks

### Phase 3: Polish & Error Handling (Lower Priority)
10. Error pages
11. Toast notifications
12. Advanced accessibility features
13. Mobile responsive refinements

## Key Design Notes

### Color Scheme
- **Light Mode**: Clean whites, subtle grays, blue accents
- **Dark Mode**: Deep blacks, subtle contrasts, vibrant blue accents
- **Accent Color**: Primary blue (#3b82f6)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Heading Sizes**: 2xl-4xl
- **Body**: sm-base
- **Line Height**: Relaxed (1.6-1.8)

### Spacing
- Generous padding (p-6, p-8, p-12)
- Consistent gaps (gap-4, gap-6, gap-8)
- Large touch targets (min 44x44px)

### Animations
- Subtle and professional
- Duration: 200-500ms
- Easing: ease-out, ease-in-out
- Use Framer Motion for complex animations
- Support `prefers-reduced-motion`

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader friendly
- High contrast mode
- Focus indicators
- Skip navigation links

## Next Steps

1. Install dependencies: `npm install`
2. Implement remaining pages in priority order
3. Create custom hooks for device management
4. Test on multiple browsers and devices
5. Implement real API integration points
6. Add comprehensive error handling
7. Performance optimization
8. Accessibility audit

## Notes for Development

- Never use chat bubble UI - questions should be displayed prominently
- Maintain professional interview room aesthetic
- Keep candidate focused with minimal distractions
- Smooth transitions between all states
- Always provide clear feedback for user actions
- Handle edge cases gracefully (network issues, permission denials)
- Test with actual camera/microphone devices
- Ensure mobile shows appropriate "desktop recommended" message
