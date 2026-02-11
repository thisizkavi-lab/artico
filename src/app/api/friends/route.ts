import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET /api/friends - Get user's friends
export async function GET() {
    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: friendships, error } = await supabase
        .from("friendships")
        .select(`
            id,
            status,
            created_at,
            friend:profiles!friendships_friend_id_fkey (
                id,
                username,
                display_name,
                bio,
                level,
                interests,
                avatar_url
            )
        `)
        .eq("user_id", user.id)
        .eq("status", "accepted");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ friends: friendships });
}
