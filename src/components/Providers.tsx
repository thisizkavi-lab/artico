"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider } from "@/lib/auth-context";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </AuthProvider>
    );
}
