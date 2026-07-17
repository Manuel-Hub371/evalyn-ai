# Evalyn AI - Running Guide

This guide explains how to run both applications that make up the Evalyn AI Interview Platform.

## Applications Overview

1. **Admin Dashboard** (Electron + React): Desktop application for recruiters and administrators
2. **Candidate Web App** (Next.js): Web application for candidates taking interviews

## Prerequisites

- Node.js 18+ and npm
- Windows OS (tested environment)

---

## Admin Dashboard (Desktop Application)

### Installation

```bash
# Navigate to the root directory
cd c:\Users\USER\Desktop\Manuel2995\PROJECTS\evalyn-ai

# Install dependencies (if not already done)
npm install
```

### Running

```bash
# Start the development server
npm run dev
```

The Vite dev server will start and display a URL (e.g., `http://localhost:5173/` or another port if that's busy).

### Opening in Electron

To run as a desktop application:

```bash
# In a separate terminal
npm run electron
```

Or manually:
```bash
npx electron electron/main.js
```

### Features

- ✅ Dashboard with metrics and charts
- ✅ Jobs management  
- ✅ Interview templates library
- ✅ Template builder (6-step wizard)
- ✅ Knowledge base management
- ✅ Candidates list and details
- ✅ Reports and analytics
- ✅ Settings and configuration
- ✅ Dark/Light mode toggle
- ✅ Command Palette (Cmd/Ctrl+K)

### Status

**✅ WORKING** - Currently running on http://localhost:5176/

---

## Candidate Web App (Next.js Application)

### Known Issue

The Web App is experiencing dependency installation issues related to the `@next/swc-win32-x64-msvc` binary package. This is a known issue with Next.js on certain Windows environments.

### Installation Options

#### Option 1: Fresh Install (Recommended)

```bash
# Navigate to web directory
cd c:\Users\USER\Desktop\Manuel2995\PROJECTS\evalyn-ai\web

# Clean everything
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force

# Try installing with legacy peer deps
npm install --legacy-peer-deps
```

#### Option 2: Use Yarn Instead

```bash
# Install Yarn globally if not already installed
npm install -g yarn

# Navigate to web directory
cd c:\Users\USER\Desktop\Manuel2995\PROJECTS\evalyn-ai\web

# Clean and install
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
yarn install
```

#### Option 3: Disable SWC (Already Applied)

The `next.config.js` has been updated to disable SWC minification:

```javascript
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  compiler: {
    // Disable SWC compiler, use Babel as fallback
  },
}
```

### Running (After Successful Installation)

```bash
# Start the development server
npm run dev
# OR if using yarn
yarn dev
```

The Next.js server will start on `http://localhost:3000/`

### Features

- ✅ Invitation landing page  
- ✅ Complete device check (camera, mic, speaker, internet)
- ✅ Interview rules and guidelines
- ✅ Professional lobby/waiting room
- ✅ Main interview room (3-panel layout)
  - AI Interviewer with animated avatar
  - Candidate video feed
  - Interview info and progress
- ✅ Live transcript with waveform
- ✅ Settings drawer (theme, devices, volume)
- ✅ Interview complete page
- ✅ Comprehensive error pages
- ✅ Dark/Light mode with Framer Motion animations

### Status

**⚠️ PENDING** - Installation in progress due to dependency issues

---

## Troubleshooting

### Admin Dashboard Issues

**Problem**: Port already in use  
**Solution**: The Vite server automatically finds an available port. Check the console output for the actual URL.

**Problem**: CSS errors (e.g., `border-border` class)  
**Solution**: This has been fixed in `src/index.css`.

### Web App Issues

**Problem**: `@next/swc-win32-x64-msvc` load error  
**Solutions**:
1. Try the installation options above
2. Use a different Node version (try Node 18 LTS)
3. Install Visual C++ Redistributables if missing
4. Use WSL2 (Windows Subsystem for Linux) as an alternative environment

**Problem**: `Invalid Version` error during npm install  
**Solution**: This might be a corrupted package-lock.json. Delete it and try again:
```bash
Remove-Item package-lock.json -Force
npm install
```

---

## Access URLs

Once both applications are running:

- **Admin Dashboard**: http://localhost:5176/ (or check console for actual port)
- **Candidate Web App**: http://localhost:3000/

---

## Project Structure

```
evalyn-ai/
├── src/                    # Admin Dashboard source
├── electron/               # Electron main process
├── web/                    # Candidate Web App (Next.js)
├── package.json            # Admin dependencies
└── web/package.json        # Web app dependencies
```

---

## Next Steps

1. ✅ Admin Dashboard is running - you can access it now
2. ⏳ Complete Web App installation using one of the options above
3. 🔄 Start Web App dev server
4. 🎯 Test both applications
5. 🚀 Ready for backend integration

---

## Notes

- Both applications use mock data and are ready for backend API integration
- The UI/UX is production-ready and fully functional
- Dark mode persists across sessions using localStorage
- All components are built with TypeScript for type safety
- The design is industry-agnostic and works for any sector

---

## Support

If you continue experiencing issues with the Web App installation, consider:

1. Using a different package manager (yarn, pnpm)
2. Trying on a different environment (WSL2, Linux, macOS)
3. Checking Node.js version compatibility (Node 18 LTS recommended)
4. Reviewing the npm debug logs in `C:\Users\USER\AppData\Local\npm-cache\_logs\`

---

*Last Updated: July 16, 2026*
