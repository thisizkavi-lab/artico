-- Supabase Database Schema for artiCO
-- Run this in your Supabase SQL Editor (supabase.com → your project → SQL Editor)

-- 1. Enable RLS (Row Level Security)
alter database postgres set "app.jwt_secret" to 'your-jwt-secret';

-- 2. Profiles table (extends auth.users)
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    username text unique,
    display_name text,
    bio text,
    level text default 'Foundations',
    interests text[] default '{}',
    avatar_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone"
    on public.profiles for select
    using (true);

create policy "Users can update own profile"
    on public.profiles for update
    using (auth.uid() = id);

create policy "Users can insert own profile"
    on public.profiles for insert
    with check (auth.uid() = id);

-- 3. Friendships table
create table if not exists public.friendships (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    friend_id uuid references public.profiles(id) on delete cascade not null,
    status text default 'pending' check (status in ('pending', 'accepted', 'skipped')),
    created_at timestamptz default now(),
    unique(user_id, friend_id)
);

-- Enable RLS
alter table public.friendships enable row level security;

-- Policies for friendships
create policy "Users can view own friendships"
    on public.friendships for select
    using (auth.uid() = user_id or auth.uid() = friend_id);

create policy "Users can create friendships"
    on public.friendships for insert
    with check (auth.uid() = user_id);

create policy "Users can update own friendships"
    on public.friendships for update
    using (auth.uid() = user_id or auth.uid() = friend_id);

-- 4. Posts table
create table if not exists public.posts (
    id uuid primary key default gen_random_uuid(),
    author_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    content text not null,
    category text not null check (category in ('question', 'tip', 'discussion', 'resource')),
    upvotes int default 0,
    downvotes int default 0,
    created_at timestamptz default now()
);

-- Enable RLS
alter table public.posts enable row level security;

-- Policies for posts
create policy "Posts are viewable by everyone"
    on public.posts for select
    using (true);

create policy "Authenticated users can create posts"
    on public.posts for insert
    with check (auth.uid() = author_id);

create policy "Users can update own posts"
    on public.posts for update
    using (auth.uid() = author_id);

create policy "Users can delete own posts"
    on public.posts for delete
    using (auth.uid() = author_id);

-- 5. Comments table
create table if not exists public.comments (
    id uuid primary key default gen_random_uuid(),
    post_id uuid references public.posts(id) on delete cascade not null,
    author_id uuid references public.profiles(id) on delete cascade not null,
    content text not null,
    upvotes int default 0,
    created_at timestamptz default now()
);

-- Enable RLS
alter table public.comments enable row level security;

-- Policies for comments
create policy "Comments are viewable by everyone"
    on public.comments for select
    using (true);

create policy "Authenticated users can create comments"
    on public.comments for insert
    with check (auth.uid() = author_id);

create policy "Users can update own comments"
    on public.comments for update
    using (auth.uid() = author_id);

-- 6. Votes table
create table if not exists public.votes (
    user_id uuid references public.profiles(id) on delete cascade not null,
    post_id uuid references public.posts(id) on delete cascade not null,
    vote_type text check (vote_type in ('up', 'down')),
    created_at timestamptz default now(),
    primary key (user_id, post_id)
);

-- Enable RLS
alter table public.votes enable row level security;

-- Policies for votes
create policy "Users can view own votes"
    on public.votes for select
    using (auth.uid() = user_id);

create policy "Users can create votes"
    on public.votes for insert
    with check (auth.uid() = user_id);

create policy "Users can update own votes"
    on public.votes for update
    using (auth.uid() = user_id);

create policy "Users can delete own votes"
    on public.votes for delete
    using (auth.uid() = user_id);

-- 7. Lesson Progress table
create table if not exists public.lesson_progress (
    user_id uuid references public.profiles(id) on delete cascade not null,
    lesson_id text not null,
    completed boolean default false,
    completed_at timestamptz,
    created_at timestamptz default now(),
    primary key (user_id, lesson_id)
);

-- Enable RLS
alter table public.lesson_progress enable row level security;

-- Policies for lesson progress
create policy "Users can view own progress"
    on public.lesson_progress for select
    using (auth.uid() = user_id);

create policy "Users can create progress"
    on public.lesson_progress for insert
    with check (auth.uid() = user_id);

create policy "Users can update own progress"
    on public.lesson_progress for update
    using (auth.uid() = user_id);

-- 8. Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, username, display_name)
    values (
        new.id,
        new.raw_user_meta_data->>'username',
        coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'username', 'User')
    );
    return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- 9. Function to get comment count for posts
create or replace function public.get_comment_count(post_uuid uuid)
returns int as $$
    select count(*)::int from public.comments where post_id = post_uuid;
$$ language sql stable;

-- 10. Indexes for performance
create index if not exists idx_friendships_user_id on public.friendships(user_id);
create index if not exists idx_friendships_friend_id on public.friendships(friend_id);
create index if not exists idx_posts_author_id on public.posts(author_id);
create index if not exists idx_posts_created_at on public.posts(created_at desc);
create index if not exists idx_comments_post_id on public.comments(post_id);
create index if not exists idx_lesson_progress_user_id on public.lesson_progress(user_id);
