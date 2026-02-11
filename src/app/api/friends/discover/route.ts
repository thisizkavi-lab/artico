import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET /api/friends/discover - Get discoverable users
export async function GET() {
    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get IDs of users already connected (friends or skipped)
    const { data: existingConnections } = await supabase
        .from("friendships")
        .select("friend_id")
        .eq("user_id", user.id);

    const excludeIds = [
        user.id,
        ...(existingConnections?.map(c => c.friend_id) || [])
    ];

    // Get profiles not in excluded list
    const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .not("id", "in", `(${excludeIds.join(",")})`)
        .limit(50);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Add mutual friends count (simplified - would need proper query in production)
    const usersWithMutuals = profiles?.map(profile => ({
        ...profile,
        mutualFriends: Math.floor(Math.random() * 10) // Mock for now
    })) || [];

    return NextResponse.json({ users: usersWithMutuals });
}

// POST /api/friends/discover - Add or skip a user
export async function POST(request: Request) {
    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { friendId, action } = body;

    if (!friendId || !action) {
        return NextResponse.json({ error: "Missing friendId or action" }, { status: 400 });
    }

    const status = action === "add" ? "accepted" : "skipped";

    const { error } = await supabase
        .from("friendships")
        .upsert({
            user_id: user.id,
            friend_id: friendId,
            status
        });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, status });
}
