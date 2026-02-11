import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// POST /api/posts/[id]/vote - Vote on a post
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: postId } = await params;
    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { voteType } = body; // 'up' or 'down'

    if (!voteType || !['up', 'down'].includes(voteType)) {
        return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });
    }

    // Check existing vote
    const { data: existingVote } = await supabase
        .from("votes")
        .select("vote_type")
        .eq("user_id", user.id)
        .eq("post_id", postId)
        .single();

    // Get current post
    const { data: post } = await supabase
        .from("posts")
        .select("upvotes, downvotes")
        .eq("id", postId)
        .single();

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let newUpvotes = post.upvotes;
    let newDownvotes = post.downvotes;

    if (existingVote) {
        // Remove previous vote effect
        if (existingVote.vote_type === 'up') newUpvotes--;
        if (existingVote.vote_type === 'down') newDownvotes--;

        if (existingVote.vote_type === voteType) {
            // Toggle off - delete vote
            await supabase
                .from("votes")
                .delete()
                .eq("user_id", user.id)
                .eq("post_id", postId);
        } else {
            // Change vote
            await supabase
                .from("votes")
                .update({ vote_type: voteType })
                .eq("user_id", user.id)
                .eq("post_id", postId);

            if (voteType === 'up') newUpvotes++;
            if (voteType === 'down') newDownvotes++;
        }
    } else {
        // New vote
        await supabase
            .from("votes")
            .insert({
                user_id: user.id,
                post_id: postId,
                vote_type: voteType
            });

        if (voteType === 'up') newUpvotes++;
        if (voteType === 'down') newDownvotes++;
    }

    // Update post vote counts
    await supabase
        .from("posts")
        .update({ upvotes: newUpvotes, downvotes: newDownvotes })
        .eq("id", postId);

    return NextResponse.json({
        upvotes: newUpvotes,
        downvotes: newDownvotes
    });
}
