import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET /api/posts/[id] - Get a single post with comments
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createServerSupabaseClient();

    // Get the post
    const { data: post, error: postError } = await supabase
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
        .eq("id", id)
        .single();

    if (postError) {
        return NextResponse.json({ error: postError.message }, { status: 404 });
    }

    // Get comments for this post
    const { data: comments, error: commentsError } = await supabase
        .from("comments")
        .select(`
            *,
            author:profiles!comments_author_id_fkey (
                id,
                username,
                display_name,
                avatar_url
            )
        `)
        .eq("post_id", id)
        .order("created_at", { ascending: true });

    if (commentsError) {
        return NextResponse.json({ error: commentsError.message }, { status: 500 });
    }

    return NextResponse.json({
        post: {
            ...post,
            comment_count: comments?.length || 0
        },
        comments: comments || []
    });
}
