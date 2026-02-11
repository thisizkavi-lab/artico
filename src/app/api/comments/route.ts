import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// POST /api/comments - Create a new comment
export async function POST(request: Request) {
    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { postId, content } = body;

    if (!postId || !content) {
        return NextResponse.json({ error: "Missing postId or content" }, { status: 400 });
    }

    const { data: comment, error } = await supabase
        .from("comments")
        .insert({
            post_id: postId,
            author_id: user.id,
            content
        })
        .select(`
            *,
            author:profiles!comments_author_id_fkey (
                id,
                username,
                display_name,
                avatar_url
            )
        `)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ comment });
}
