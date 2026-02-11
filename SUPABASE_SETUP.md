# Supabase Backend Setup

This document explains how to set up the Supabase backend for artiCO.

## Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account (free tier works)

## Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose a name (e.g., "artico")
4. Set a database password (save this!)
5. Select a region close to your users
6. Wait for the project to be created (~2 minutes)

### 2. Get Your API Keys

1. Go to **Settings → API**
2. Copy the **Project URL** (looks like `https://xxx.supabase.co`)
3. Copy the **anon public** key (starts with `eyJ...`)

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
```

### 4. Run Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Create a new query
3. Copy the contents of `supabase/schema.sql`
4. Paste and run the query
5. You should see "Success. No rows returned"

### 5. Enable Authentication Providers

For email/password auth (already enabled by default):
- Go to **Authentication → Providers**
- Email should be enabled

For Google OAuth (optional):
1. Go to **Authentication → Providers → Google**
2. Enable it
3. Add your Google OAuth credentials
4. Add `http://localhost:3000/api/auth/callback` to redirect URLs

### 6. Start Development

```bash
npm run dev
```

## Database Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (extends auth.users) |
| `friendships` | Friend relationships |
| `posts` | Community posts |
| `comments` | Post comments |
| `votes` | Post voting |
| `lesson_progress` | User lesson completion |

## API Routes

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/auth/callback` | GET | - | OAuth callback |
| `/api/friends` | GET | ✓ | Get user's friends |
| `/api/friends/discover` | GET/POST | ✓ | Discover & add friends |
| `/api/posts` | GET/POST | GET: -, POST: ✓ | List/create posts |
| `/api/posts/[id]` | GET | - | Get post with comments |
| `/api/posts/[id]/vote` | POST | ✓ | Vote on post |
| `/api/comments` | POST | ✓ | Add comment |
| `/api/progress` | GET/POST | ✓ | Get/update progress |

## Troubleshooting

### "Invalid API key"
- Check your `.env.local` has the correct keys
- Restart the dev server after changing env vars

### "Row Level Security" errors
- Make sure you ran the full `schema.sql`
- Check the policies were created in **Authentication → Policies**

### OAuth not working
- Verify your redirect URL is whitelisted in Supabase
- Check browser console for CORS errors
