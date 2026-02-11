import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET /api/posts - Get all posts
export async function GET() {
    const supabase = await createServerSupabaseClient();

    const { data: posts, error } = await supabase
        .from("posts")
        .select(`
            *,
            author:profiles!posts_author_id_fkey (
                id,
                username,
                display_name,
                avatar_url
            )
        `)
        .order("created_at", { ascending: false })
        .limit(50);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get comment counts for each post
    const postsWithCounts = await Promise.all(
        (posts || []).map(async (post) => {
            const { count } = await supabase
                .from("comments")
                .select("*", { count: "exact", head: true })
                .eq("post_id", post.id);

            return {
                ...post,
                comment_count: count || 0
            };
        })
    );

    return NextResponse.json({ posts: postsWithCounts });
}

// POST /api/posts - Create a new post
export async function POST(request: Request) {
    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, category } = body;

    if (!title || !content || !category) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: post, error } = await supabase
        .from("posts")
        .insert({
            author_id: user.id,
            title,
            content,
            category
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post });
}
