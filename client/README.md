# Evalyn AI - Candidate Interview Application

A premium, production-quality AI-powered interview platform for candidates. This application provides a professional, distraction-free interview experience that feels like a real human interview room.

## Features

- **Professional Interview Experience**: Modern UI comparable to Microsoft Teams, Zoom, Linear, and Notion
- **Complete Interview Flow**: From invitation to completion with device checks, rules, lobby, and interview screens
- **AI Interviewer**: Animated avatar with speaking, listening, and thinking states
- **Real-time Interaction**: Live voice transcription, waveform animations, and status indicators
- **Accessibility First**: Full keyboard navigation, screen reader support, high contrast mode
- **Responsive Design**: Optimized for desktop/laptop with tablet support
- **Dark/Light Mode**: Seamless theme switching
- **Connection Recovery**: Automatic reconnection handling
- **Settings Drawer**: Camera, microphone, speaker selection, theme, font size, accessibility options

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: shadcn/ui patterns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
client/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── interview/          # Interview-specific components
│   │   ├── device-check/       # Device testing components
│   │   └── shared/             # Shared components
│   ├── lib/                    # Utility functions
│   ├── store/                  # Zustand stores
│   ├── hooks/                  # Custom React hooks
│   └── types/                  # TypeScript types
├── public/                     # Static assets
└── package.json
```

## Design Principles

- **Focus**: Keep candidates concentrated on the interview
- **Professionalism**: Premium, calm, and distraction-free experience
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsiveness**: Fluid across desktop and tablet
- **Smooth Animations**: Subtle, purposeful motion
- **Clear Hierarchy**: Easy navigation and information architecture

## Key Pages

1. **Invitation Landing** - Interview details and start button
2. **Device Check** - Camera, microphone, speaker, and connection tests
3. **Interview Rules** - Company guidelines and acceptance
4. **Interview Lobby** - Professional waiting room
5. **Main Interview** - Core interview experience with AI
6. **Interview Complete** - Success confirmation and next steps

## Contributing

This is a production-quality candidate interview application. Follow the existing code patterns and design principles when contributing.

## License

Proprietary - All rights reserved
