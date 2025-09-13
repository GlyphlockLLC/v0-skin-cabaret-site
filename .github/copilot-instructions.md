# Skin Cabaret Website Development Guide

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.**

## Project Overview

Skin Cabaret is a Next.js 15 web application for an adult entertainment venue in Scottsdale, Arizona. The website features responsive design, video backgrounds, interactive forms, API endpoints for email/SMS functionality, and complex animations. Built with TypeScript, Radix UI components, and Tailwind CSS, deployed automatically to Vercel.

## Essential Setup Commands

**NEVER CANCEL any build or test commands. Builds may take 30+ minutes, tests may take 15+ minutes.**

### Initial Setup
```bash
# Install pnpm package manager (required)
npm install -g pnpm

# Install project dependencies - takes 20-30 seconds
pnpm install

# NEVER CANCEL: Initial ESLint setup may take 5-10 minutes
pnpm run lint
```

### Development Workflow
```bash
# Start development server - takes 1-2 seconds, runs on localhost:3000
pnpm run dev

# **CRITICAL**: Build command - takes 25-30 minutes, NEVER CANCEL
# Set timeout to 90+ minutes minimum
pnpm run build

# Start production server (must build first)
pnpm run start

# Run linting - takes 3-5 seconds, expect warnings/errors
pnpm run lint
```

## Build & Environment Requirements

### Known Build Issues in Sandboxed Environments
- **Google Fonts**: May fail to load due to network restrictions. Modify `app/layout.tsx` to disable font imports if needed
- **optimizeCss**: May fail due to missing `critters` dependency. Disable in `next.config.mjs` if needed
- **External Resources**: Video and image CDN resources may be blocked by network policies

### Build Time Expectations
- **Dependencies install**: 20-30 seconds
- **Development server startup**: 1-2 seconds  
- **Production build**: 25-30 minutes (NEVER CANCEL)
- **ESLint initial setup**: 5-10 minutes
- **Linting after setup**: 3-5 seconds

### Required Environment Variables (Optional for Development)
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Testing & Validation

### Manual Testing Scenarios
**ALWAYS test these scenarios after making changes:**

1. **Homepage Load**: Navigate to localhost:3000, verify page loads with video backgrounds
2. **Navigation**: Test all nav buttons (Home, Sports, Hiring, Contact) - should scroll smoothly to sections
3. **Phone Links**: Click "CALL NOW" buttons - should attempt to dial (480) 425-7546
4. **Popup Functionality**: Close auto-popup by clicking X button
5. **API Endpoints**: Test `/api/send-test-email` - should return proper error for missing env vars
6. **Responsive Design**: Test mobile and desktop viewports
7. **Form Interactions**: Click "Apply Now" buttons to open job application forms

### API Testing
```bash
# Test email API endpoint (expects environment variable error)
curl -X POST http://localhost:3000/api/send-test-email -H "Content-Type: application/json" -d '{"test": "data"}'

# Expected response: {"error":"Email credentials not configured",...}
```

### Built-in Testing
The application includes automatic functionality testing that runs on page load and reports to console:
- Email API connectivity
- Navigation section detection  
- Video background loading
- Responsive design detection
- Form validation

## Code Quality Standards

### ESLint Results (Expected)
The codebase has existing ESLint warnings/errors that are acceptable:
- **Unused variables**: Many state variables are defined but not actively used
- **TypeScript any types**: Some API responses use `any` type
- **React unescaped entities**: Apostrophes in text content
- **Missing dependencies**: Some useEffect hooks have incomplete dependency arrays

### TypeScript Configuration
- **Target**: ES6
- **Strict mode**: Enabled
- **Module resolution**: Bundler
- **JSX**: Preserve
- **Path mapping**: `@/*` maps to project root

## Project Structure

### Key Directories
```
/app/                 # Next.js App Router pages and layouts
  /api/              # API endpoints (email, SMS, booking)
  /demos/            # Demo pages for features
  layout.tsx         # Root layout with fonts and metadata
  page.tsx           # Main homepage component (2000+ lines)
  globals.css        # Global styles and animations

/components/         # Reusable React components
  /ui/              # UI component library (buttons, forms, etc.)
  mobile-menu.tsx   # Mobile navigation
  *-popup.tsx       # Various modal popups

/lib/               # Utility functions
/public/            # Static assets (images, videos, icons)
/styles/            # Additional CSS files
```

### Important Files
- **next.config.mjs**: Next.js configuration with security headers, image optimization
- **package.json**: Dependencies and scripts
- **tsconfig.json**: TypeScript configuration  
- **tailwind.config.js**: (If present) Tailwind CSS configuration
- **.eslintrc.json**: ESLint configuration (auto-generated)

## Deployment & CI/CD

### GitHub Actions Workflows
1. **deploy-with-jules.yml**: Main deployment using fictional "Jules" automation (educational example)
2. **webpack.yml**: Standard Node.js build workflow for multiple Node versions

### Vercel Configuration
- **Auto-deployment**: Enabled for main branch
- **Environment**: Production optimized
- **Custom domains**: Configured for skincabaret.com
- **Analytics**: Vercel Speed Insights enabled

## Common Development Tasks

### Adding New Features
1. **Always** test the build process first: `pnpm run build`
2. **Always** run linting: `pnpm run lint` 
3. **Always** test manually with the validation scenarios above
4. Components should follow existing patterns in `/components/ui/`
5. API endpoints go in `/app/api/` directory
6. Use TypeScript interfaces for type safety

### Debugging Issues
1. **Build failures**: Check for Google Fonts or optimizeCss issues first
2. **Network errors**: Expect external resource failures in sandboxed environments  
3. **TypeScript errors**: Review existing code patterns for acceptable `any` usage
4. **Runtime errors**: Check browser console for automatic testing results

### Performance Optimization
- **Video backgrounds**: Multiple optimized formats provided
- **Image optimization**: Next.js image component configured
- **Bundle analysis**: Run `pnpm run build` to see bundle sizes
- **Caching**: Security headers configured for static assets

## Security & Privacy

### Content Security Policy
- **X-Frame-Options**: DENY
- **X-Content-Type-Options**: nosniff  
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Strict-Transport-Security**: Enabled

### Adult Content Considerations
- **Age verification**: 21+ required, ID validation mentioned
- **Professional context**: Business website for regulated entertainment venue
- **Privacy**: Contact forms and email handling for business inquiries only

## Troubleshooting

### "Build taking too long"
**DO NOT CANCEL!** Builds normally take 25-30 minutes. Wait at least 45 minutes before investigating.

### "Google Fonts failing"
Modify `app/layout.tsx` to disable Google Fonts imports and use fallback fonts.

### "optimizeCss error"
Disable `optimizeCss: true` in `next.config.mjs` experimental settings.

### "ESLint setup hanging"
Allow 10+ minutes for initial ESLint configuration. This is normal for first-time setup.

### "Development server not responding"
Wait 5-10 seconds after startup. Server should be available at localhost:3000.

## Additional Resources

- **Next.js 15 Documentation**: https://nextjs.org/docs
- **Radix UI Components**: https://radix-ui.com
- **Tailwind CSS**: https://tailwindcss.com
- **Vercel Deployment**: https://vercel.com/docs

**Remember: NEVER CANCEL long-running builds or tests. Always test functionality manually after changes. Follow the validation scenarios to ensure the application works correctly.**