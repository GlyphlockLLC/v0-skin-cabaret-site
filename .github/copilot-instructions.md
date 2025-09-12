# Skin Cabaret Website - Developer Instructions

Skin Cabaret is a Next.js 15 web application for a premium adult entertainment venue in Scottsdale, Arizona. Built with React 19, TypeScript, and Tailwind CSS, featuring responsive design, interactive components, and modern UI elements.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Setup (Required for fresh clone)
- **Node.js version**: v20.19.5+ is installed and working
- **Package manager**: Use npm (pnpm is NOT available in this environment)
- **Install dependencies**: `npm install --legacy-peer-deps`
  - **CRITICAL**: Must use `--legacy-peer-deps` flag due to React 19 compatibility issues
  - **Time**: Takes ~55 seconds to complete. NEVER CANCEL. Set timeout to 120+ seconds.
  - **Note**: Will show 1 moderate severity vulnerability - this is expected and safe to ignore

### Build Commands (Production)
- **Build command**: `NEXT_TELEMETRY_DISABLED=1 npm run build`
  - **Time**: Takes ~39 seconds. NEVER CANCEL. Set timeout to 90+ seconds.
  - **CRITICAL limitation**: Build WILL FAIL with Google Fonts errors due to network restrictions
  - **Required workaround**: See "Network Limitations" section below for Google Fonts fixes
  - **Success criteria**: Build completes with static pages generated and no errors

### Development Server
- **Start dev server**: `NEXT_TELEMETRY_DISABLED=1 npm run dev`
  - **Time**: Ready in ~1.8 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
  - **URL**: http://localhost:3000
  - **Note**: Google Fonts may fail to load but application will still function
  - **Success criteria**: Server starts and application loads in browser

### Production Server
- **Start production server**: `NEXT_TELEMETRY_DISABLED=1 npm run start`
  - **Prerequisite**: Must run successful build first
  - **Time**: Starts immediately if build exists
  - **URL**: http://localhost:3000

### Linting and Code Quality
- **Lint command**: `npm run lint`
  - **Time**: Takes ~3.7 seconds. Set timeout to 30+ seconds.
  - **First run**: Will prompt for ESLint configuration - press Enter to accept "Strict (recommended)"
  - **Note**: Many lint warnings/errors exist in current codebase - focus only on new issues you introduce
  - **Expected issues**: TypeScript `any` types, unused variables, unescaped quotes - these are existing

## Network Limitations and Workarounds

### Google Fonts Issue (CRITICAL)
The application uses Google Fonts (Montserrat, JetBrains Mono) which fail to load due to network restrictions.

**For development/testing**: Application works without fonts using fallback system fonts.

**For production builds**: You must temporarily modify files to remove Google Font imports:
1. **Comment out** Google Font imports in `app/layout.tsx`:
   ```typescript
   // import { Montserrat, JetBrains_Mono } from "next/font/google"
   ```
2. **Remove** font variable usage in className:
   ```typescript
   // Change: className={`font-sans ${montserrat.variable} ${jetbrainsMono.variable} antialiased`}
   // To: className="font-sans antialiased"
   ```
3. **Build successfully**, then restore original files
4. **Document this limitation** in any changes that affect the build process

### External Resources
- Some images may fail to load from external CDNs due to network restrictions
- API endpoints to external services may not work in this environment
- This is normal and expected - focus on code functionality

## Validation Scenarios

### Always test after making changes:
1. **Install and build**: Run the complete install → build → dev server cycle
2. **Navigate application**: Test main navigation (Home, Sports, Hiring, Contact)
3. **Interactive elements**: Click buttons, test modals, verify responsiveness
4. **Browser console**: Check for new errors (ignore existing font/image loading errors)
5. **Linting**: Run `npm run lint` to catch new code issues

### Manual validation steps:
1. Load http://localhost:3000 in browser
2. Verify page renders with dark theme and red branding
3. Test navigation buttons switch active states
4. Close any modal popups that appear
5. Scroll through page sections to verify content loads
6. Check responsive design by resizing browser window

## Repository Structure

### Key directories and files:
```
├── app/                    # Next.js app router pages and API routes
│   ├── api/               # API endpoints (email, booking, etc.)
│   ├── demos/             # Demo pages for different features
│   ├── globals.css        # Global styles and theme variables
│   ├── layout.tsx         # Root layout with metadata and fonts
│   └── page.tsx           # Main homepage component
├── components/            # Reusable React components
│   ├── ui/                # Base UI components (buttons, etc.)
│   ├── booking-system.tsx # Booking and reservation components
│   ├── chatbot.tsx        # Interactive chat functionality
│   ├── events-calendar.tsx# Event calendar system
│   └── [other-components] # Gallery, testimonials, forms, etc.
├── lib/                   # Utility functions and helpers
├── public/                # Static assets (images, icons)
├── styles/                # Additional stylesheet files
├── .github/               # GitHub workflows and configurations
└── [config files]        # Next.js, TypeScript, package configs
```

### Important configuration files:
- `package.json`: Dependencies and scripts
- `next.config.mjs`: Next.js configuration with security headers
- `tsconfig.json`: TypeScript compiler settings
- `.eslintrc.json`: ESLint rules configuration
- `tailwind.config.js`: Tailwind CSS customization
- `vercel.json`: Vercel deployment settings

## Development Notes

### Architecture:
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom theme variables
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks and local state
- **Deployment**: Vercel platform

### Key features:
- Responsive design with mobile/desktop layouts
- Dark theme with red accent colors
- Interactive booking and reservation systems
- Event calendar and sports viewing schedules
- Customer testimonials and reviews
- Contact forms and chatbot functionality
- Image galleries and modal systems

### Common tasks:
- **Add new pages**: Create in `app/` directory following Next.js App Router conventions
- **New components**: Add to `components/` with TypeScript types
- **Styling**: Use Tailwind classes and custom CSS variables from `globals.css`
- **API endpoints**: Create in `app/api/` for server-side functionality
- **Images**: Add to `public/` directory and use Next.js Image component

### Before committing changes:
1. **Test build**: Ensure `npm run build` completes successfully
2. **Test development**: Verify `npm run dev` works and application loads
3. **Run linting**: Execute `npm run lint` and fix any NEW issues
4. **Manual testing**: Complete validation scenarios listed above
5. **Document limitations**: Note any network-related issues or workarounds needed

## Troubleshooting

### Common issues and solutions:

**Build fails with Google Fonts error**:
- Expected due to network restrictions
- Use temporary workaround in "Network Limitations" section

**npm install fails with dependency conflicts**:
- Always use `--legacy-peer-deps` flag
- This is required due to React 19 compatibility

**ESLint configuration prompts**:
- Choose "Strict (recommended)" when prompted
- This creates proper `.eslintrc.json` configuration

**Development server port conflicts**:
- Kill existing processes on port 3000
- Use `pkill -f "next dev"` if needed

**Slow build times**:
- 39+ seconds is normal for this application
- Do not cancel builds prematurely

### Performance expectations:
- **npm install**: ~55 seconds (acceptable)
- **Build time**: ~39 seconds (normal)
- **Dev server start**: ~1.8 seconds (fast)
- **Lint time**: ~3.7 seconds (acceptable)

**NEVER CANCEL builds or long-running commands**. Use appropriate timeouts (90+ seconds for builds, 120+ seconds for installs) and wait for completion.