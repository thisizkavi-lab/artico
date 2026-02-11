"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Dashboard now redirects to /home
export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/home");
    }, [router]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-cocoa border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
