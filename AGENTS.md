# AGENTS.md — Family Fathers Website

This document provides guidance for AI agents working on the Family Fathers website codebase.

## Project Overview

**Family Fathers** is a professional website for a child-centred supervision service supporting families during family law proceedings. The service operates in Metropolitan Melbourne, Australia.

**Purpose:** Marketing website with contact form for client enquiries about supervised visitation services, featuring a full admin panel for content management.

**Status:** Production website (treat with care)

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| React | React | 19.2.3 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| UI Components | Radix UI primitives + custom | 1.4.3 |
| Icons | Lucide React | 0.563.0 |
| Forms | React Hook Form + Zod | 7.71.1 / 4.3.6 |
| Animation | tw-animate-css | 1.4.0 |
| Utilities | class-variance-authority, clsx, tailwind-merge | 0.7.1 / 2.1.1 / 3.4.0 |
| Database | Upstash Redis | 1.36.2 |
| File Storage | Vercel Blob | 2.0.1 |

---

## Project Structure

```
Family Fathers/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with Inter font, metadata
│   │   ├── page.tsx                # Homepage (single-page site)
│   │   ├── globals.css             # Tailwind imports, CSS variables, theme
│   │   ├── favicon.ico
│   │   ├── admin/                  # Admin panel routes
│   │   │   ├── layout.tsx          # Admin layout with sidebar + auth check
│   │   │   ├── page.tsx            # Admin dashboard
│   │   │   ├── login/
│   │   │   │   └── page.tsx        # Admin login page
│   │   │   ├── hero/
│   │   │   │   └── page.tsx        # Edit hero section
│   │   │   ├── features/
│   │   │   │   └── page.tsx        # Edit features section
│   │   │   ├── process/
│   │   │   │   └── page.tsx        # Edit process steps
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx        # Edit pricing plans
│   │   │   ├── service-areas/
│   │   │   │   └── page.tsx        # Edit service areas
│   │   │   ├── about/
│   │   │   │   └── page.tsx        # Edit about section
│   │   │   └── contact/
│   │   │       └── page.tsx        # Edit contact/footer content
│   │   └── api/
│   │       ├── admin/
│   │       │   ├── auth/
│   │       │   │   ├── login/
│   │       │   │   │   └── route.ts    # POST: Authenticate admin
│   │       │   │   ├── logout/
│   │       │   │   │   └── route.ts    # POST: Destroy session
│   │       │   │   └── session/
│   │       │   │       └── route.ts    # GET: Check auth status
│   │       │   └── content/
│   │       │       └── route.ts        # GET/POST: Content CRUD
│   │       └── upload/
│   │           └── route.ts            # POST: Image upload to Vercel Blob
│   ├── components/
│   │   ├── Header.tsx              # Sticky nav with mobile sheet menu
│   │   ├── Hero.tsx                # Landing section (fetches from CMS)
│   │   ├── Features.tsx            # "We Provide" cards (fetches from CMS)
│   │   ├── Process.tsx             # Server wrapper (fetches from CMS)
│   │   ├── ProcessClient.tsx       # Client accordion component
│   │   ├── About.tsx               # About section (fetches from CMS)
│   │   ├── Pricing.tsx             # Fee cards (fetches from CMS)
│   │   ├── ServiceAreas.tsx        # Server wrapper (fetches from CMS)
│   │   ├── ServiceAreasClient.tsx  # Client accordion component
│   │   ├── Contact.tsx             # Server wrapper (fetches from CMS)
│   │   ├── ContactForm.tsx         # Multi-step form client component
│   │   ├── Footer.tsx              # Links + contact info (fetches from CMS)
│   │   └── ui/                     # Shadcn-style primitives
│   │       ├── accordion.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── sheet.tsx
│   └── lib/
│       ├── utils.ts                # cn() helper for class merging
│       ├── auth.ts                 # Session management functions
│       ├── redis.ts                # Upstash Redis client + content keys
│       └── content.ts              # CMS functions + type definitions
├── public/
│   ├── hero-family.jpg             # Hero section image
│   ├── about-team.jpg              # About section image
│   ├── family-fathers-logo.png     # Brand logo
│   └── favicon_io/                 # Favicon assets
├── package.json
├── tsconfig.json
├── postcss.config.mjs              # PostCSS configuration
├── eslint.config.mjs               # ESLint flat config
├── components.json                 # Shadcn UI configuration
├── next.config.ts
└── vercel.json                     # Vercel deployment config
```

---

## Admin Panel System

### Overview

The site includes a password-protected admin panel for editing all website content. Content is stored in Redis (Upstash) and persists across deployments.

### Authentication

**Login:** `/admin/login`
- Password-based authentication
- Environment variable: `ADMIN_PASSWORD`
- Session stored in HTTP-only cookie (`admin_session`)
- 7-day session expiry
- Redirects to `/admin` on success

**Session Validation:**
- Admin layout checks session on mount
- Protected API routes verify session before writes
- Unauthenticated users redirected to login

### Admin Routes

| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard with links to all editors |
| `/admin/login` | Authentication page |
| `/admin/hero` | Edit heading, badges, hero image |
| `/admin/features` | Edit feature cards, highlights, best practice |
| `/admin/process` | Edit 4-step process accordion |
| `/admin/pricing` | Edit pricing plans and fees |
| `/admin/service-areas` | Edit Melbourne regions and councils |
| `/admin/about` | Edit about content and team image |
| `/admin/contact` | Edit contact form options, footer, contact info |

### Admin Layout

- Client component with sidebar navigation
- Mobile-responsive with collapsible sidebar
- 8 navigation items (Dashboard + 7 content sections)
- Logout button in sidebar
- Loading state while checking auth

---

## API Routes

### Authentication APIs

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/api/admin/auth/login` | Authenticate with password | No |
| POST | `/api/admin/auth/logout` | Destroy session | No |
| GET | `/api/admin/auth/session` | Check auth status | No |

### Content API

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/api/admin/content` | Fetch content (all or by section) | No |
| GET | `/api/admin/content?section=hero` | Fetch single section | No |
| POST | `/api/admin/content` | Update content section | Yes |

**Valid Sections:** `hero`, `features`, `process`, `pricing`, `serviceAreas`, `about`, `contact`, `footer`

### Upload API

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/api/upload` | Upload image to Vercel Blob | Yes |

**Constraints:**
- Accepted types: JPEG, PNG, GIF, WebP
- Max size: 5MB
- Returns: `{ success: true, url: string }`

---

## Content Management System

### How It Works

1. **Storage:** Content stored in Upstash Redis with prefix `content:`
2. **Fetching:** Server components call `getContent(key)` at render time
3. **Fallbacks:** If Redis fails, default content from `content.ts` is used
4. **Editing:** Admin panel calls POST `/api/admin/content` to save
5. **Persistence:** Changes persist across deployments (Redis)

### Content Types

| Key | Type | Content |
|-----|------|---------|
| `hero` | `HeroContent` | Heading, badges array, image URL |
| `features` | `FeaturesContent` | Feature cards, highlights, best practice text |
| `process` | `ProcessContent` | Steps array (number, title, timeframe, subtitle, content) |
| `pricing` | `PricingContent` | Pricing plans, fees, CTA text |
| `serviceAreas` | `ServiceAreasContent` | Regions array with councils |
| `about` | `AboutContent` | About text, features checklist, team image |
| `contact` | `ContactContent` | Enquiry options, success messages |
| `footer` | `FooterContent` | Footer text, links, contact info |

### Default Content

All default content is defined in `src/lib/content.ts`. These serve as:
- Initial content before any edits
- Fallback if Redis is unavailable
- Type reference for content structure

---

## Brand Colors

The site uses a **teal and orange** color palette:

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Teal (Primary) | `#02B1C5` | `--color-teal` | Buttons, links, accents, headings |
| Teal Dark | `#019AAD` | `--color-teal-dark` | Hover states |
| Teal Light | `#E6F7F9` | `--color-teal-light` | Backgrounds, icon circles |
| Orange (Secondary) | `#FAC39D` | `--color-orange` | Badges, accents, logo |
| Orange Dark | `#F5A66A` | `--color-orange-dark` | Badge text |
| Orange Light | `#FEF3EB` | `--color-orange-light` | Badge backgrounds |

**Common Tailwind classes:**
- Primary button: `bg-[#02B1C5] hover:bg-[#019AAD]`
- Light background: `bg-[#F9F9F9]`
- Card hover: `hover:border-[#02B1C5]/20`

---

## Component Patterns

### Server/Client Split Pattern

For components with interactivity that also need CMS data:

1. **Server Wrapper** fetches content from Redis
2. **Client Component** receives content as props and handles interactivity

**Examples:**
- `Process.tsx` (server) → `ProcessClient.tsx` (client)
- `ServiceAreas.tsx` (server) → `ServiceAreasClient.tsx` (client)
- `Contact.tsx` (server) → `ContactForm.tsx` (client)

### Component Types

| Component | Type | Content Source |
|-----------|------|----------------|
| `Header.tsx` | Client | Hardcoded (navLinks) |
| `Hero.tsx` | Server | Redis CMS |
| `Features.tsx` | Server | Redis CMS |
| `Process.tsx` | Server | Redis CMS |
| `ProcessClient.tsx` | Client | Props from parent |
| `About.tsx` | Server | Redis CMS |
| `Pricing.tsx` | Server | Redis CMS |
| `ServiceAreas.tsx` | Server | Redis CMS |
| `ServiceAreasClient.tsx` | Client | Props from parent |
| `Contact.tsx` | Server | Redis CMS |
| `ContactForm.tsx` | Client | Props from parent |
| `Footer.tsx` | Server | Redis CMS |

**Note:** `Header.tsx` is the only component with hardcoded content (navigation links).

### UI Components

Located in `src/components/ui/`. These are Shadcn-style primitives built on Radix UI.

**Available Primitives:**
- `Accordion` — Collapsible content sections
- `Button` — Multiple variants (default, outline, ghost, etc.)
- `Card` — Container with header/content/footer
- `Form` — React Hook Form integration
- `Input` — Text input field
- `Label` — Form labels
- `Select` — Dropdown selection
- `Sheet` — Slide-out panel (mobile nav)

### Path Aliases

The project uses `@/` as alias to `src/`:
```tsx
import { cn } from "@/lib/utils";
import { getContent } from "@/lib/content";
import { Header } from "@/components/Header";
```

---

## Library Functions

### `src/lib/utils.ts`

```tsx
cn(...inputs: ClassValue[]) // Merge Tailwind classes
```

### `src/lib/auth.ts`

```tsx
verifyPassword(password: string)  // Validate against ADMIN_PASSWORD
createSession()                    // Create session cookie
destroySession()                   // Delete session cookie
verifySession()                    // Validate existing session
getSessionStatus()                 // Returns { authenticated: boolean }
```

### `src/lib/redis.ts`

```tsx
redis                             // Upstash Redis client instance
CONTENT_KEYS                      // Map of section names to Redis keys
ContentKey                        // TypeScript type for valid keys
```

### `src/lib/content.ts`

```tsx
getContent<K>(key: K)             // Fetch content from Redis (with fallback)
setContent<K>(key: K, content)    // Save content to Redis
getAllContent()                   // Fetch all content sections

// Default content exports
defaultHeroContent
defaultFeaturesContent
defaultProcessContent
defaultPricingContent
defaultServiceAreasContent
defaultAboutContent
defaultContactContent
defaultFooterContent
```

---

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `ADMIN_PASSWORD` | Admin panel authentication | Yes |
| `KV_REST_API_URL` | Upstash Redis URL | Yes |
| `KV_REST_API_TOKEN` | Upstash Redis token | Yes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token | Yes |

---

## Important Conventions

### Styling

1. **Use Tailwind utility classes** — no separate CSS files per component
2. **Transitions:** Most interactive elements use `transition-all duration-300`
3. **Hover effects:** Cards often use `hover:shadow-lg hover:-translate-y-1` (disabled on mobile via `sm:hover:`)
4. **Border radius:** Prefer `rounded-xl` (12px) or `rounded-2xl` (16px) for cards
5. **Container:** Use `container mx-auto px-4 sm:px-6`
6. **Buttons:** Use `rounded-[10px]` for primary CTAs

### Custom CSS Classes (globals.css)

- `.btn-glow` — Animated shine effect on hover
- `.card-lift` — Lift effect with teal shadow on hover
- `.link-underline` — Animated underline on hover

### Mobile Touch Optimizations

- Minimum touch target: 44px × 44px
- Hover effects disabled on touch devices (`@media (hover: none)`)
- Teal tap highlight color on mobile

### Section Structure

Each section follows this pattern:
```tsx
<section className="py-16 md:py-24 bg-[background-color]">
  <div className="container mx-auto px-4 md:px-6">
    {/* Section Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Section Title
      </h2>
      <p className="text-gray-600 text-lg">Subtitle</p>
    </div>
    {/* Content */}
  </div>
</section>
```

### Navigation

The site is a **single-page application** with anchor links:
- `#about` → Features section ("About Our Service")
- `#process` → Process section ("Our Process")
- `#pricing` → Pricing section ("Our Fees")
- `#contact` → Contact form section ("Contact Us")

**Note:** Smooth scrolling enabled in `globals.css` with `scroll-padding-top` offset for fixed header.

---

## Key Rules for Changes

### DO

- Make **minimal, surgical changes**
- Match existing design patterns and colors
- Preserve all existing functionality
- Test on mobile and desktop
- Fix any lint errors you introduce
- Use the admin panel for content changes when possible
- Maintain type safety with existing content interfaces

### DO NOT

- Remove existing functionality
- Redesign UI without explicit request
- Rewrite copy unless instructed
- Introduce new frameworks or CMS (system already exists)
- Change routing structure
- Modify authentication without explicit request
- Add new content types without updating types in `content.ts`

---

## Development Commands

```bash
# Install dependencies
npm install

# Development server (localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## Current Status

### Completed Items

- **Admin Panel** — Full CMS with editors for all sections
- **Content Storage** — Redis persistence via Upstash
- **Authentication** — Session-based admin authentication
- **Image Upload** — Vercel Blob storage for uploaded images
- **Hero image** — Real image at `/public/hero-family.jpg`
- **About image** — Real image at `/public/about-team.jpg`
- **Branding** — "FAMILY FATHERS" logo displayed correctly
- **Mobile responsive** — All components optimized for mobile

### Pending Items

1. **Form submission** — Contact form currently simulates submission (no email/backend)
2. **SEO optimization** — Basic metadata in place, may need Open Graph tags
3. **Analytics** — No tracking implemented
4. **Navigation CMS** — Header navLinks still hardcoded (not in admin panel)

---

## Pricing Reference

| Service | Price | Details |
|---------|-------|---------|
| Intake Assessment | $250 | Fixed fee per parent |
| Weekday Supervision | $250 | Per 120 minute session |
| Weekend Supervision | $250 | Per 120 minute session |
| Additional Supervision | $125 | Per hour of additional time |
| Observation Reports | $75/session | Minimum $300 (4 sessions) |

**Note:** Pricing is editable via admin panel at `/admin/pricing`

---

## Contact Information

- Phone: `0493 429 730`
- Email: `contact@familyfathers.com.au`

**Note:** Contact info is editable via admin panel at `/admin/contact`

---

## File Quick Reference

| Need to... | Method |
|------------|--------|
| Edit any website content | Use Admin Panel (`/admin`) |
| Change metadata/SEO | Edit `src/app/layout.tsx` |
| Modify colors/theme | Edit `src/app/globals.css` |
| Update navigation links | Edit `src/components/Header.tsx` (hardcoded) |
| Add new content section | Add type in `content.ts`, create admin page |
| Add UI primitives | Add to `src/components/ui/` |
| Replace static images | Upload via admin or add to `public/` |
| Change auth behavior | Edit `src/lib/auth.ts` |
| Modify content storage | Edit `src/lib/content.ts` |
| Add new API route | Add to `src/app/api/` |

---

## Data Flow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Admin Panel   │────▶│   API Routes    │────▶│  Upstash Redis  │
│  (Edit Content) │     │  (Validate/Save)│     │   (Storage)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │◀────│ Server Comps    │◀────│  getContent()   │
│   (Rendered)    │     │ (Fetch at SSR)  │     │  (Read Redis)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Security Notes

- Admin password stored in environment variable (never in code)
- Session tokens are HTTP-only cookies (not accessible via JS)
- Content API requires authentication for writes (GET is public)
- File uploads validate type and size before storage
- Session secured in production (`secure: true` cookie flag)
