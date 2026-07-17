# Main Interview Page Layout Specification

This document provides a detailed visual specification for the main interview page.

## 🖼️ Overall Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR                                                      │
│ [Company Logo] [Progress ████████░░░ 75%] [⏱ 15:23] [🌐 Connected]   │
└─────────────────────────────────────────────────────────────────────────┘
┌───────────────────┬──────────────────────┬────────────────────────────┐
│                   │                      │                            │
│   LEFT PANEL      │    CENTER PANEL      │      RIGHT PANEL           │
│   (30% width)     │    (40% width)       │      (30% width)           │
│                   │                      │                            │
│  ┌─────────────┐  │  ┌────────────────┐ │  ┌──────────────────────┐  │
│  │             │  │  │                │ │  │  Interview Progress  │  │
│  │ AI Avatar   │  │  │   Candidate    │ │  │  ─────────────────   │  │
│  │  (Animated) │  │  │   Video Feed   │ │  │  Stage 3 of 5        │  │
│  │             │  │  │                │ │  │  □ Introduction      │  │
│  │   Speaking  │  │  │   [Your Face]  │ │  │  □ Technical         │  │
│  │             │  │  │                │ │  │  ■ Behavioral ←      │  │
│  └─────────────┘  │  │   📹 ON  🎤 ON │ │  │  □ Scenario          │  │
│                   │  └────────────────┘ │  │  □ Closing           │  │
│  ┌─────────────┐  │                      │  └──────────────────────┘  │
│  │  Current    │  │                      │                            │
│  │  Question   │  │                      │  ┌──────────────────────┐  │
│  │  ─────────  │  │                      │  │  Interview Tips      │  │
│  │             │  │                      │  │  ─────────────────   │  │
│  │ "Tell me    │  │                      │  │  • Be specific       │  │
│  │  about a    │  │                      │  │  • Use STAR method   │  │
│  │  time when  │  │                      │  │  • Take your time    │  │
│  │  you..."    │  │                      │  └──────────────────────┘  │
│  │             │  │                      │                            │
│  └─────────────┘  │                      │                            │
│                   │                      │                            │
└───────────────────┴──────────────────────┴────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ LIVE TRANSCRIPT PANEL                                                   │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 🎤 [Waveform Animation] "I led a project where we had to..."       │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────┐
│ BOTTOM CONTROLS                                                         │
│    [🎤 Mute] [📹 Camera] [⚙️ Settings] [🆘 Help] [🔴 End Interview]  │
└─────────────────────────────────────────────────────────────────────────┘
```

## 📐 Detailed Specifications

### Top Navigation Bar
**Height**: 64px  
**Background**: bg-card with border-b  
**Elements**:
- Company Logo (40x40px, left aligned, ml-6)
- Progress Bar (flex-1, max-w-md, mx-auto)
  - Shows percentage: "75% Complete"
  - Visual bar with primary color
- Elapsed Time (mr-4)
  - Format: "15:23" or "1:15:23"
  - Icon: Clock
- Connection Status (mr-6)
  - Green dot + "Connected"
  - Yellow dot + "Poor Connection"
  - Red dot + "Reconnecting..."

---

### Left Panel (AI Interviewer + Question)
**Width**: 30% of viewport  
**Padding**: p-8  
**Background**: bg-background

#### AI Avatar Section
- **Dimensions**: 128x128px circle
- **Position**: Center aligned at top
- **Animation States**:
  - **Speaking**: Pulsing animation, MessageSquare icon, blue glow
  - **Listening**: Expanding circles, Microphone icon, green glow
  - **Thinking**: Spinning loader, yellow glow
  - **Idle**: Static, gray

- **Status Text** below avatar:
  - "AI is speaking..."
  - "Listening to your response..."
  - "Analyzing your response..."
  - "Preparing next question..."

#### Current Question Section
- **Margin Top**: mt-12
- **Background**: bg-card p-6 rounded-xl
- **Typography**: 
  - Font size: text-2xl
  - Font weight: font-medium
  - Line height: leading-relaxed
  - Text align: center
  - Color: text-foreground

- **Animation**: Fade in from bottom when question changes
- **No chat bubbles** - question appears as prominent text

---

### Center Panel (Candidate Video)
**Width**: 40% of viewport  
**Padding**: p-6  
**Background**: bg-background

#### Video Container
- **Aspect Ratio**: 16:9
- **Border Radius**: rounded-xl
- **Background**: bg-black
- **Position**: Relative for overlays

#### Video Overlays
**Top-Left Corner** (absolute, top-4, left-4):
- Camera Status: 📹 ON / 📹 OFF
- Microphone Status: 🎤 ON / 🎤 MUTED
- Recording Indicator: 🔴 REC (if recording, pulse animation)

**Top-Right Corner** (absolute, top-4, right-4):
- Fullscreen button (optional)

**Bottom Edge** (absolute, bottom-4, centered):
- Network quality indicator
  - Bars visualization: ▂▄▆█
  - "Excellent" / "Good" / "Poor"

---

### Right Panel (Interview Information)
**Width**: 30% of viewport  
**Padding**: p-8  
**Background**: bg-background

#### Interview Progress Card
- **Background**: bg-card p-6 rounded-xl mb-6
- **Title**: "Interview Progress" (font-semibold)
- **Content**:
  - Current stage highlight
  - All stages list with checkboxes
  - Completed stages: ✓ green
  - Current stage: ■ blue, arrow indicator
  - Upcoming stages: □ gray

#### Interview Tips Card (if allowed by company)
- **Background**: bg-muted/30 p-6 rounded-xl
- **Title**: "Interview Tips" (font-semibold)
- **Content**:
  - Bullet list of tips
  - Icon for each tip
  - Helpful guidance for current stage

#### Stage Information (optional)
- Description of current stage
- Expected duration
- Question count remaining

---

### Live Transcript Panel
**Height**: 120-180px  
**Background**: bg-card  
**Border**: border-t  
**Padding**: p-6

#### Elements:
- **Header Row**:
  - "Live Transcript" (text-sm font-semibold, left)
  - Waveform Animation (right, active when speaking)

- **Transcript Content**:
  - Scrollable area (max-h-[200px], overflow-y-auto)
  - Real-time text as candidate speaks
  - Auto-scroll to bottom
  - Typography: text-foreground, leading-relaxed

- **Empty State**:
  - When not speaking: "Your response will be transcribed here..."
  - When listening: "Listening... Start speaking..."
  - Italicized, text-muted-foreground

---

### Bottom Controls Bar
**Height**: 72px  
**Background**: bg-card  
**Border**: border-t  
**Layout**: Centered flex row with gap-4

#### Buttons (left to right):
1. **Mute/Unmute** (🎤)
   - Primary button when unmuted
   - Destructive button when muted
   - Shows: "Mute" / "Unmuted"

2. **Camera Toggle** (📹)
   - Primary button when on
   - Secondary button when off
   - Shows: "Camera On" / "Camera Off"

3. **Settings** (⚙️)
   - Ghost button
   - Opens settings drawer

4. **Report Issue** (🆘)
   - Ghost button
   - Opens help modal

5. **End Interview** (🔴)
   - Destructive button
   - Right-aligned with ml-auto
   - Confirmation dialog before ending

---

## 🎨 Visual Hierarchy

### Primary Focus
1. **Current Question** (largest text, center-left)
2. **Candidate Video** (large, center)
3. **AI Avatar** (animated, draws attention)

### Secondary Elements
- Progress indicators
- Interview tips
- Status indicators

### Tertiary Elements
- Transcript
- Controls (always accessible but not distracting)

---

## 🎭 State-Specific Layouts

### AI Speaking State
- AI Avatar: Pulsing with blue glow
- Question: Displayed prominently, possibly with slight highlight animation
- Status Text: "AI is speaking..."
- Candidate: Can see their own video, but microphone may be temporarily disabled

### Candidate Speaking State
- AI Avatar: Listening state with green glow
- Question: Remains visible but slightly dimmed
- Live Transcript: Actively updating
- Waveform: Animated based on audio input
- Status Text: "Listening to your response..."

### AI Thinking State
- AI Avatar: Spinning animation with yellow glow
- Status Text: "Analyzing your response..." or "Preparing next question..."
- Question: May fade out or be replaced with loading state
- Candidate: Can review their video, controls available

### Connection Issue State
- Connection Status: Yellow/Red indicator in top bar
- Overlay: Semi-transparent overlay on video with reconnection message
- Controls: Disabled except for settings and help
- AI Avatar: Paused state
- Auto-retry mechanism shown

---

## 📱 Responsive Breakpoints

### Desktop (1920x1080+)
- Full three-column layout as described
- All elements fully visible
- Generous spacing

### Laptop (1366x768)
- Three-column layout maintained
- Slightly reduced padding
- Font sizes adjusted minimally

### Tablet (768px-1024px)
- Two-column layout:
  - Top: AI + Question (full width)
  - Bottom: Video (70%) + Info Panel (30%)
- Transcript below video
- Controls remain at bottom

### Mobile (<768px)
- Show message: "For the best interview experience, please use a desktop or laptop computer"
- Option to continue anyway (if company allows)
- Single column stack:
  - AI Avatar
  - Question
  - Video
  - Controls
  - Transcript collapsible

---

## 🌈 Color Palette

### Light Mode
- **Background**: #FFFFFF
- **Card**: #F9FAFB
- **Border**: #E5E7EB
- **Text**: #111827
- **Muted Text**: #6B7280
- **Primary**: #3B82F6
- **Success**: #22C55E
- **Warning**: #EAB308
- **Error**: #EF4444

### Dark Mode
- **Background**: #0F172A
- **Card**: #1E293B
- **Border**: #334155
- **Text**: #F1F5F9
- **Muted Text**: #94A3B8
- **Primary**: #60A5FA
- **Success**: #4ADE80
- **Warning**: #FCD34D
- **Error**: #F87171

---

## ⌨️ Keyboard Shortcuts

- **Space**: Toggle mute/unmute
- **Ctrl+K**: Open settings
- **Ctrl+H**: Open help
- **Esc**: Close modals/drawers
- **Tab**: Navigate between controls
- **Enter**: Activate focused button

---

## 🎬 Animations & Transitions

### Question Transition
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5, ease: 'easeOut' }}
```

### AI Avatar Pulse (Speaking)
```typescript
animate={{ scale: [1, 1.05, 1] }}
transition={{ 
  duration: 2, 
  repeat: Infinity, 
  ease: 'easeInOut' 
}}
```

### Status Indicator Fade
```typescript
className="transition-all duration-300 ease-in-out"
```

### Panel Slide In
```typescript
initial={{ x: -300, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
transition={{ duration: 0.3, ease: 'easeOut' }}
```

---

## 🔧 Implementation Notes

### Video Stream Management
- Use `getUserMedia` for camera access
- Display stream in video element with `autoPlay`, `playsInline`, `muted`
- Clean up stream on component unmount
- Handle device switching in settings

### Real-Time Transcript
- Use Web Speech API or cloud service
- Buffer interim results
- Display final results
- Auto-scroll to bottom

### Connection Monitoring
- Ping backend every 5 seconds
- Monitor latency
- Show reconnection UI if connection drops
- Attempt automatic reconnection

### State Synchronization
- Use Zustand for client state
- Sync with backend via WebSocket
- Handle offline state gracefully
- Queue actions when offline

---

## ✅ Accessibility Checklist

- [ ] All interactive elements have focus indicators
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text)
- [ ] Keyboard navigation works for all controls
- [ ] Screen reader announces AI state changes
- [ ] Video has appropriate ARIA labels
- [ ] Transcript is screen reader accessible
- [ ] High contrast mode available
- [ ] Font size adjustable in settings
- [ ] Skip navigation link at top
- [ ] Error messages announced to screen readers

---

This layout creates a professional, distraction-free interview experience that feels like a real human interview room while maintaining modern UI/UX standards.
