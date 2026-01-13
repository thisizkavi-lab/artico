# artiCO - Next.js Landing Page

Modern, multilingual English learning app landing page built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Context** - For i18n state management

## Getting Started

### Prerequisites

Install Node.js from: https://nodejs.org/

### Installation

```bash
# Navigate to the Next.js project
cd nextjs

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with fonts
│   │   ├── page.tsx        # Main landing page
│   │   └── globals.css     # Global styles + Tailwind
│   ├── components/
│   │   ├── Navbar.tsx      # Navigation with language picker
│   │   └── LevelShowcase.tsx # Animated level cards
│   └── lib/
│       ├── translations.ts  # All translations (9 languages)
│       └── language-context.tsx # React context for i18n
├── tailwind.config.ts       # Custom design tokens
├── package.json
└── tsconfig.json
```

## Features

- ✅ **9 Languages** - English, Japanese, Korean, Chinese, Arabic, Spanish, Portuguese, Nepali, Hindi
- ✅ **Auto-detection** - Detects user's browser language
- ✅ **Persistence** - Saves preference to localStorage
- ✅ **RTL Support** - Arabic displays correctly
- ✅ **Animated Hero** - Level showcase cycles through all 4 levels
- ✅ **Responsive Design** - Works on all devices

## Customization

### Colors

Edit `tailwind.config.ts` to change the color palette:

```typescript
colors: {
  primary: "#3366FF",    // Blue
  accent: "#00D26A",     // Green CTAs
  dark: "#1A1A2E",       // Dark backgrounds
}
```

### Translations

Add or modify translations in `src/lib/translations.ts`.

## Deployment

```bash
npm run build
npm run start
```

Or deploy to Vercel:
```bash
npx vercel
```
