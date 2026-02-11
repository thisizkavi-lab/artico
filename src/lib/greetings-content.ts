// Greetings lesson — page-based onboarding content
// Each page is one screen in the paginated onboarding viewer

export type OnboardingPageType = "text" | "list" | "pattern" | "highlight" | "note";

export interface OnboardingPage {
    id: string;
    type: OnboardingPageType;
    // Translation key prefix — the component will call t(`${tKey}.title`), t(`${tKey}.body`), etc.
    tKey: string;
    // Optional: for list pages, specify category keys
    listCategories?: string[];
    // Optional: for pattern pages
    patternId?: string;
    // Optional: media placeholder (image/gif/video/audio — can be filled later)
    media?: { type: "image" | "gif" | "video" | "audio"; src: string; alt?: string };
}

export interface OnboardingLessonData {
    id: string;
    titleKey: string;
    pages: OnboardingPage[];
    practiceModuleId: string; // links to practice
}

export const greetingsLesson: OnboardingLessonData = {
    id: "sf-01",
    titleKey: "greetings.lessonTitle",
    practiceModuleId: "greetings",
    pages: [
        // Page 1: Why greetings exist
        {
            id: "p1",
            type: "text",
            tKey: "greetings.p1",
            media: { type: "image", src: "/lessons/greetings/wave.svg", alt: "People waving" },
        },
        // Page 2: Three things a greeting tells
        {
            id: "p2",
            type: "highlight",
            tKey: "greetings.p2",
        },
        // Page 3: Why greetings come first — social permission
        {
            id: "p3",
            type: "text",
            tKey: "greetings.p3",
        },
        // Page 4: Don't try to learn all greetings at once
        {
            id: "p4",
            type: "text",
            tKey: "greetings.p4",
        },
        // Page 5: The core pattern (opening → inquiry → response → intro → farewell)
        {
            id: "p5",
            type: "highlight",
            tKey: "greetings.p5",
        },
        // Page 6: Our approach — recognize many, practice few
        {
            id: "p6",
            type: "text",
            tKey: "greetings.p6",
        },
        // Page 7: Openings list
        {
            id: "p7",
            type: "list",
            tKey: "greetings.p7",
            listCategories: ["common", "casual", "timeBased", "group", "friendly", "regional"],
        },
        // Page 8: Inquiry greetings
        {
            id: "p8",
            type: "list",
            tKey: "greetings.p8",
            listCategories: ["standard", "casual", "reconnecting", "formal"],
        },
        // Page 9: Short responses
        {
            id: "p9",
            type: "list",
            tKey: "greetings.p9",
            listCategories: ["responses"],
        },
        // Page 10: Reconnecting / recognition greetings
        {
            id: "p10",
            type: "list",
            tKey: "greetings.p10",
            listCategories: ["reconnecting"],
        },
        // Page 11: Meeting / introduction greetings
        {
            id: "p11",
            type: "list",
            tKey: "greetings.p11",
            listCategories: ["meeting"],
        },
        // Page 12: Informal variants + farewells
        {
            id: "p12",
            type: "list",
            tKey: "greetings.p12",
            listCategories: ["informal", "farewells"],
        },
        // Page 13: Important note — recognize many, practice few
        {
            id: "p13",
            type: "note",
            tKey: "greetings.p13",
        },
        // Page 14: The only rule
        {
            id: "p14",
            type: "highlight",
            tKey: "greetings.p14",
        },
        // Page 15: Pattern 1 — Social / informal
        {
            id: "p15",
            type: "pattern",
            tKey: "greetings.p15",
            patternId: "social",
        },
        // Page 16: Pattern 2 — Professional / one person
        {
            id: "p16",
            type: "pattern",
            tKey: "greetings.p16",
            patternId: "professional",
        },
        // Page 17: Pattern 3 — Professional / group
        {
            id: "p17",
            type: "pattern",
            tKey: "greetings.p17",
            patternId: "group",
        },
    ],
};
