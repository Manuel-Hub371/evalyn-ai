# Installation Instructions

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for version control)

Check your installations:
```bash
node --version  # should be v18+
npm --version   # should be 9+
```

---

## Quick Start (3 Steps)

### 1. Navigate to the Client Folder

```bash
cd client
```

### 2. Install Dependencies

This will install all required packages (~200 MB):

```bash
npm install
```

**Expected packages to be installed:**
- next (^14.1.0)
- react (^18.2.0)
- react-dom (^18.2.0)
- typescript (^5.3.3)
- tailwindcss (^3.4.1)
- zustand (^4.5.0)
- framer-motion (^11.0.3)
- lucide-react (^0.316.0)
- And more...

### 3. Start Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.5s
```

Open your browser and go to: **http://localhost:3000**

---

## Verification

### You Should See:
1. The invitation landing page loads
2. Company logo placeholder
3. "Senior Software Engineer" position
4. "Start Interview" button
5. Professional card layout

### Try These:
- [ ] Click the "Start Interview" button (will redirect to /device-check)
- [ ] Toggle dark mode (if implemented in UI)
- [ ] Check responsive design (resize browser)
- [ ] Open browser console (no errors should appear)

---

## Troubleshooting

### Issue: `npm install` fails

**Solution 1**: Clear npm cache
```bash
npm cache clean --force
npm install
```

**Solution 2**: Delete node_modules and try again
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

**Solution 3**: Use specific Node version
```bash
# Install nvm (Node Version Manager) first
nvm install 18
nvm use 18
npm install
```

---

### Issue: Port 3000 already in use

**Solution**: Use a different port
```bash
npm run dev -- -p 3001
```

Or kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

### Issue: `Module not found` errors

**Solution**: Ensure TypeScript paths are configured
```bash
# Check tsconfig.json exists
# Run type check
npm run type-check
```

---

### Issue: Styling doesn't load

**Solution**: Ensure Tailwind is compiled
```bash
# Check if globals.css is imported in layout.tsx
# Restart dev server
npm run dev
```

---

### Issue: Dark mode doesn't work

**Solution**: Check browser localStorage
```javascript
// Open browser console
localStorage.getItem('theme-storage')
// Should return: {"state":{"theme":"system"},"version":0}
```

---

## Environment Setup (Optional)

### Create `.env.local` file

```bash
# In the client folder
type nul > .env.local
```

Add environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
```

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Check TypeScript types
npm run type-check
```

---

## IDE Setup (Recommended)

### VS Code Extensions

Install these for the best experience:

1. **ESLint** - Microsoft
2. **Tailwind CSS IntelliSense** - Tailwind Labs
3. **TypeScript Vue Plugin (Volar)** - Vue
4. **Pretty TypeScript Errors** - yoavbls
5. **Error Lens** - Alexander

### VS Code Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Testing the Setup

### Manual Tests

1. **Navigation Test**
   - Click "Start Interview" button
   - Should redirect to /device-check (will show 404 until page is built)

2. **State Persistence Test**
   - Change theme (if UI available)
   - Refresh page
   - Theme should persist

3. **Responsive Test**
   - Open browser dev tools (F12)
   - Toggle device toolbar
   - Try different screen sizes

4. **TypeScript Test**
   ```bash
   npm run type-check
   # Should complete with no errors
   ```

5. **Build Test**
   ```bash
   npm run build
   # Should compile successfully
   ```

---

## Next Steps After Installation

1. **Read the Documentation**
   - `GETTING_STARTED.md` - Quick overview
   - `PROJECT_STRUCTURE.md` - File organization
   - `IMPLEMENTATION_GUIDE.md` - Code patterns
   - `INTERVIEW_LAYOUT.md` - Visual specs

2. **Explore the Code**
   - Check out `src/app/invitation/page.tsx` - Example page
   - Look at `src/components/interview/ai-avatar.tsx` - Animated component
   - Review `src/store/interview-store.ts` - State management

3. **Start Building**
   - Create device-check page
   - Or jump to main interview page
   - Use existing components as templates

---

## Production Build

### Build the Application

```bash
npm run build
```

This creates an optimized production build in `.next` folder.

### Test Production Build Locally

```bash
npm start
```

Visit http://localhost:3000 to see production version.

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow the prompts. Your app will be live in minutes!

### Deploy to Other Platforms

**Netlify**, **AWS**, **Azure**, or any platform that supports Next.js.

Build command: `npm run build`  
Output directory: `.next`

---

## Dependency Details

### Production Dependencies (10)

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^14.1.0 | React framework |
| react | ^18.2.0 | UI library |
| react-dom | ^18.2.0 | React renderer |
| zustand | ^4.5.0 | State management |
| framer-motion | ^11.0.3 | Animations |
| lucide-react | ^0.316.0 | Icons |
| clsx | ^2.1.0 | Classname utility |
| tailwind-merge | ^2.2.1 | Tailwind merger |
| class-variance-authority | ^0.7.0 | Variant utility |

### Development Dependencies (10)

| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5.3.3 | Type safety |
| @types/node | ^20.11.5 | Node types |
| @types/react | ^18.2.48 | React types |
| @types/react-dom | ^18.2.18 | React DOM types |
| tailwindcss | ^3.4.1 | CSS framework |
| postcss | ^8.4.33 | CSS processor |
| autoprefixer | ^10.4.17 | CSS prefixer |
| eslint | ^8.56.0 | Code linting |
| eslint-config-next | ^14.1.0 | Next.js ESLint config |

---

## Success Checklist

- [ ] Node.js v18+ installed
- [ ] npm install completed without errors
- [ ] npm run dev starts successfully
- [ ] Browser opens http://localhost:3000
- [ ] Invitation page loads correctly
- [ ] No console errors
- [ ] npm run build succeeds
- [ ] TypeScript check passes
- [ ] Ready to start building!

---

## Getting Help

### Documentation
- Check the 5 comprehensive guides in the client folder
- Next.js docs: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs

### Common Questions

**Q: Do I need to install anything globally?**  
A: No, everything is local to the project.

**Q: Can I use yarn instead of npm?**  
A: Yes! Just replace `npm install` with `yarn` and `npm run` with `yarn`.

**Q: How big is node_modules?**  
A: About 200-250 MB. This is normal for modern web apps.

**Q: Can I delete node_modules?**  
A: Yes, you can always reinstall with `npm install`.

**Q: Does this work offline?**  
A: After first install, yes. But some features may need internet.

---

## You're All Set! 🎉

The development environment is ready. Time to build an amazing interview experience!

**Next**: Open `GETTING_STARTED.md` to learn what to build first.
