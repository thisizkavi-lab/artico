import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET /api/progress - Get user's lesson progress
export async function GET() {
    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: progress, error } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("user_id", user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ progress: progress || [] });
}

// POST /api/progress - Update lesson progress
export async function POST(request: Request) {
    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { lessonId, completed } = body;

    if (!lessonId || typeof completed !== 'boolean') {
        return NextResponse.json({ error: "Missing lessonId or completed" }, { status: 400 });
    }

    const { error } = await supabase
        .from("lesson_progress")
        .upsert({
            user_id: user.id,
            lesson_id: lessonId,
            completed,
            completed_at: completed ? new Date().toISOString() : null
        });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
