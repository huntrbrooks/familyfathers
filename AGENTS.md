# AGENTS.md — Family Fathers Website

This document provides guidance for AI agents working on the Family Fathers website codebase.

## Project Overview

**Family Fathers** is a professional website for a child-centred supervision service supporting families during family law proceedings. The service operates in Metropolitan Melbourne, Australia.

**Purpose:** Marketing website with contact form for client enquiries about supervised visitation services.

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

---

## Project Structure

```
supervision-clone/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with Inter font, metadata
│   │   ├── page.tsx        # Homepage (single-page site)
│   │   ├── globals.css     # Tailwind imports, CSS variables, theme
│   │   └── favicon.ico
│   ├── components/
│   │   ├── Header.tsx      # Sticky nav with mobile sheet menu
│   │   ├── Hero.tsx        # Landing section with badges + family image
│   │   ├── Features.tsx    # "We Provide" cards + highlights
│   │   ├── Process.tsx     # 4-step accordion process
│   │   ├── About.tsx       # About section with team image
│   │   ├── Pricing.tsx     # Fee cards ($250 sessions)
│   │   ├── ServiceAreas.tsx # Melbourne regions accordion (5 regions)
│   │   ├── ContactForm.tsx # Multi-step form (3 steps)
│   │   ├── Footer.tsx      # Links + contact info
│   │   └── ui/             # Shadcn-style primitives
│   │       ├── accordion.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── sheet.tsx
│   └── lib/
│       └── utils.ts        # cn() helper for class merging
├── public/
│   ├── hero-family.jpg     # Hero section image
│   ├── about-team.jpg      # About section image
│   └── logo.png            # Brand logo
├── package.json
├── tsconfig.json
├── postcss.config.mjs      # PostCSS configuration
├── eslint.config.mjs       # ESLint flat config
├── components.json         # Shadcn UI configuration
└── next.config.ts
```

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

### Client vs Server Components
- **Server Components** (default): `Hero.tsx`, `Features.tsx`, `About.tsx`, `Pricing.tsx`, `Footer.tsx`
- **Client Components** (`"use client"`): `Header.tsx`, `Process.tsx`, `ServiceAreas.tsx`, `ContactForm.tsx`

Use `"use client"` only when:
- Component uses React hooks (`useState`, `useEffect`)
- Component uses browser-only APIs
- Component handles user interactions (forms, accordions, mobile sheet menu)

### UI Components
Located in `src/components/ui/`. These are Shadcn-style primitives built on Radix UI.

**Usage pattern:**
```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

### Path Aliases
The project uses `@/` as alias to `src/`:
```tsx
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
```

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

## Data & Content

### Hardcoded Data
Currently, all content is hardcoded in components:

| Component | Data |
|-----------|------|
| `Header.tsx` | `navLinks[]` (4 links) |
| `Features.tsx` | `features[]` (4 cards), `highlights[]` (3 items) |
| `Process.tsx` | `steps[]` (4 steps with number, title, timeframe, subtitle, content) |
| `Pricing.tsx` | `pricingPlans[]` (4 pricing tiers) |
| `ServiceAreas.tsx` | `serviceAreas[]` (5 Melbourne regions with councils) |
| `ContactForm.tsx` | `enquiryOptions[]` (5 enquiry types) |
| `Footer.tsx` | `navLinks[]` (duplicated from Header) |
| `About.tsx` | `features[]` (3 checklist items) |

### Contact Form
- 3-step wizard form with progress bar
- Step 1: fullName, childName (name information)
- Step 2: phone, email (contact information)
- Step 3: enquiryType (select dropdown)
- **Currently simulates submission** (no backend integration)
- Shows success message after submit with phone callback option

### Contact Information
- Phone: `0493 429 730`
- Email: `contact@familyfathers.com.au`

---

## Key Rules for Changes

### DO
- Make **minimal, surgical changes**
- Match existing design patterns and colors
- Preserve all existing functionality
- Test on mobile and desktop
- Fix any lint errors you introduce

### DO NOT
- Remove existing functionality
- Redesign UI without explicit request
- Rewrite copy unless instructed
- Introduce new frameworks or CMS
- Change routing structure
- Hardcode content that should be editable

### Future Admin/CMS
If admin features are requested:
- Content should be editable via admin panel
- Changes must persist after refresh/redeploy
- Extend existing patterns rather than adding new systems

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
- **Hero image** — Real image at `/public/hero-family.jpg`
- **About image** — Real image at `/public/about-team.jpg`
- **Branding** — "FAMILY FATHERS" logo displayed correctly in Header and Footer
- **Mobile responsive** — All components optimized for mobile with touch-friendly targets

### Pending Items
1. **Form submission** — Currently simulated, needs backend integration (API route or external service)
2. **SEO optimization** — Basic metadata in place, may need Open Graph tags
3. **Analytics** — No tracking implemented

---

## Pricing Reference

| Service | Price | Details |
|---------|-------|---------|
| Intake Assessment | $250 | Fixed fee per parent |
| Weekday Supervision | $250 | Per 120 minute session |
| Weekend Supervision | $250 | Per 120 minute session |
| Additional Supervision | $125 | Per hour of additional time |
| Observation Reports | $75/session | Minimum $300 (4 sessions) |

---

## File Quick Reference

| Need to... | File |
|------------|------|
| Change metadata/SEO | `src/app/layout.tsx` |
| Edit homepage sections | `src/app/page.tsx` |
| Modify colors/theme | `src/app/globals.css` |
| Update navigation links | `src/components/Header.tsx` + `Footer.tsx` |
| Change pricing | `src/components/Pricing.tsx` |
| Edit process steps | `src/components/Process.tsx` |
| Modify service areas | `src/components/ServiceAreas.tsx` |
| Update contact form fields | `src/components/ContactForm.tsx` |
| Edit enquiry options | `src/components/ContactForm.tsx` (enquiryOptions array) |
| Update hero content | `src/components/Hero.tsx` |
| Edit "We Provide" cards | `src/components/Features.tsx` |
| Update About section | `src/components/About.tsx` |
| Add UI primitives | `src/components/ui/` |
| Replace images | `public/` folder |
