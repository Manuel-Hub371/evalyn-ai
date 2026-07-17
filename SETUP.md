# Quick Setup Guide

## Installation

```bash
# Install dependencies
npm install

# Start development
npm run dev

# In another terminal, run Electron
npm run electron:dev
```

## First Run

The app will open as a desktop application. You'll see:

1. **Sidebar Navigation** - 8 main sections
2. **Dashboard** - Overview with charts and statistics
3. **Theme Toggle** - Top right corner for dark/light mode
4. **Command Palette** - Press Cmd/Ctrl+K for quick navigation

## Key Features to Explore

### 1. Interview Template Builder
- Navigate to: Interview Templates → Create Template
- 6-step wizard to configure interviews
- No AI prompts needed - just fill forms

### 2. Jobs Management
- Navigate to: Jobs
- Create, edit, delete job postings
- Filter by status and department

### 3. Candidates
- Navigate to: Candidates
- View candidate list with scores
- Click any candidate to see detailed profile

### 4. Knowledge Base
- Navigate to: Knowledge Base
- Upload documents for AI context
- Supports PDF, DOCX, TXT

### 5. Analytics
- Navigate to: Analytics
- Executive dashboard with charts
- Filter by time range

## Mock Data

The app uses realistic mock data for demonstration:
- 2,847 total candidates
- 43 active jobs
- 6 interview templates
- 5 knowledge base documents
- Multiple reports and analytics

## Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open command palette
- `Esc` - Close modals/dialogs

## Theme

Toggle between light and dark mode using the sun/moon icon in the top right corner. Your preference is saved automatically.

## Browser Dev Tools

In development mode, Electron Dev Tools are open by default. Use them to:
- Inspect React components
- Check console logs
- Debug state management
- Monitor network requests (when backend is connected)

## Production Build

```bash
# Build web assets
npm run build

# Package Electron app
npm run electron:build
```

## Next Steps

1. Connect to backend API (replace mock data)
2. Implement authentication
3. Add real file upload
4. Connect AI engine
5. Set up database

## Troubleshooting

**Electron won't start:**
- Make sure Vite dev server is running first (`npm run dev`)
- Check if port 5173 is available

**Styles not loading:**
- Clear browser cache
- Restart Vite dev server
- Check Tailwind config

**Dark mode not persisting:**
- Check browser localStorage
- Verify Zustand store is working

## File Structure

```
src/
├── components/    # Reusable UI components
├── pages/        # Route pages
├── routes/       # Route configuration
├── store/        # State management
└── lib/          # Utilities
```

## Need Help?

Check the main README.md for detailed documentation.
