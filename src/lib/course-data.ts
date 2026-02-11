// Course data structure for artiCO learning modules

export interface Lesson {
    id: string;
    title: string;
    type: "intro" | "learn" | "practice" | "review";
    completed: boolean;
    current?: boolean;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    unlocked: boolean;
}

export interface Level {
    id: string;
    title: string;
    tagline: string;
    description: string;
    icon: string;
    color: string;
    accentColor: string; // For OpenStax-style theming
    modules: Module[];
    unlocked: boolean;
}

export const levels: Level[] = [
    {
        id: "foundations",
        title: "Foundations",
        tagline: "i wanna start from the complete scratch",
        description: "Build your voice from the ground up — mastering the raw sounds, rhythms, and muscle memory that make English feel natural.",
        icon: "🌱",
        color: "bg-cocoa",
        accentColor: "#4B463E",
        unlocked: true,
        modules: [
            {
                id: "alphabets",
                title: "Alphabets",
                description: "Master the 26 letters and their sounds",
                unlocked: true,
                lessons: [
                    { id: "alpha-intro", title: "Intro", type: "intro", completed: false, current: true },
                    { id: "abc-rhyme", title: "ABC Rhyme", type: "learn", completed: false },
                    { id: "letters", title: "Letters", type: "learn", completed: false },
                    { id: "sounds-intro", title: "Sounds Intro", type: "learn", completed: false },
                ],
            },
            {
                id: "tongue-twisters",
                title: "Tongue Twisters",
                description: "Train your mouth for speed and clarity",
                unlocked: true,
                lessons: [
                    { id: "twister-intro", title: "Intro", type: "intro", completed: false },
                    { id: "basic-twisters", title: "Basic Twisters", type: "learn", completed: false },
                    { id: "speed-challenge", title: "Speed Challenge", type: "practice", completed: false },
                    { id: "twister-review", title: "Review", type: "review", completed: false },
                ],
            },
        ],
    },
    {
        id: "social-fluency",
        title: "Social Fluency",
        tagline: "i wanna be social butterfly",
        description: "Enter the social world of English — to think, respond, and connect like a native speaker would in everyday social life.",
        icon: "👥",
        color: "bg-cocoa",
        accentColor: "#4B463E",
        unlocked: true,
        modules: [
            // Module 01: Conversation Skills
            {
                id: "conversation-skills",
                title: "Conversation Skills",
                description: "The fundamentals of everyday talk",
                unlocked: true,
                lessons: [
                    { id: "sf-01", title: "Greetings", type: "learn", completed: false },
                    { id: "sf-01-practice", title: "Greetings Practice", type: "practice", completed: false },
                    { id: "sf-02", title: "Making introductions", type: "learn", completed: false },
                    { id: "sf-03", title: "Conversation fillers", type: "learn", completed: false },
                    { id: "sf-04", title: "Saying you don't understand", type: "learn", completed: false },
                    { id: "sf-05", title: "Opinions and preferences", type: "learn", completed: false },
                    { id: "sf-06", title: "Agreeing and disagreeing", type: "learn", completed: false },
                    { id: "sf-07", title: "Making suggestions", type: "learn", completed: false },
                    { id: "sf-08", title: "Saying thank you", type: "learn", completed: false },
                    { id: "sf-09", title: "Saying sorry", type: "learn", completed: false },
                    { id: "sf-10", title: "Saying goodbye", type: "learn", completed: false },
                    { id: "sf-11", title: "Dates, time, and weather", type: "learn", completed: false },
                    { id: "sf-12", title: "Making arrangements", type: "learn", completed: false },
                    { id: "sf-13", title: "Talking about the weather", type: "learn", completed: false },
                ],
            },
            // Module 02: Family and Relationships
            {
                id: "family-relationships",
                title: "Family and Relationships",
                description: "Talking about the people closest to you",
                unlocked: true,
                lessons: [
                    { id: "sf-14", title: "Family and relationships", type: "intro", completed: false },
                    { id: "sf-15", title: "Talking about family", type: "learn", completed: false },
                    { id: "sf-16", title: "Life events", type: "learn", completed: false },
                    { id: "sf-17", title: "Socializing", type: "learn", completed: false },
                    { id: "sf-18", title: "Dating and romance", type: "learn", completed: false },
                    { id: "sf-19", title: "Showing support", type: "learn", completed: false },
                ],
            },
            // Module 03: Eating and Drinking
            {
                id: "eating-drinking",
                title: "Eating and Drinking",
                description: "From coffee shops to fine dining",
                unlocked: true,
                lessons: [
                    { id: "sf-20", title: "Eating and drinking", type: "intro", completed: false },
                    { id: "sf-21", title: "Cafés and coffee shops", type: "learn", completed: false },
                    { id: "sf-22", title: "Takeaway and delivery", type: "learn", completed: false },
                    { id: "sf-23", title: "Bars and pubs", type: "learn", completed: false },
                    { id: "sf-24", title: "At the restaurant", type: "learn", completed: false },
                    { id: "sf-25", title: "Cooking and eating", type: "learn", completed: false },
                ],
            },
            // Module 04: Free Time and Hobbies
            {
                id: "free-time-hobbies",
                title: "Free Time and Hobbies",
                description: "What you do when you're not working",
                unlocked: true,
                lessons: [
                    { id: "sf-26", title: "Free time and hobbies", type: "intro", completed: false },
                    { id: "sf-27", title: "At the cinema", type: "learn", completed: false },
                    { id: "sf-28", title: "At the theatre", type: "learn", completed: false },
                    { id: "sf-29", title: "Concerts and festivals", type: "learn", completed: false },
                    { id: "sf-30", title: "At the gym", type: "learn", completed: false },
                    { id: "sf-31", title: "Sporting activities", type: "learn", completed: false },
                    { id: "sf-32", title: "Sports events", type: "learn", completed: false },
                    { id: "sf-33", title: "Hobbies", type: "learn", completed: false },
                ],
            },
            // Module 05: Shops and Services
            {
                id: "shops-services",
                title: "Shops and Services",
                description: "Navigating retail and service encounters",
                unlocked: true,
                lessons: [
                    { id: "sf-34", title: "Shops and services", type: "intro", completed: false },
                    { id: "sf-35", title: "At the market", type: "learn", completed: false },
                    { id: "sf-36", title: "At the supermarket", type: "learn", completed: false },
                    { id: "sf-37", title: "At the garden centre", type: "learn", completed: false },
                    { id: "sf-38", title: "At the DIY store", type: "learn", completed: false },
                    { id: "sf-39", title: "Buying clothes and shoes", type: "learn", completed: false },
                    { id: "sf-40", title: "Returning goods", type: "learn", completed: false },
                    { id: "sf-41", title: "Hair, beauty, and grooming", type: "learn", completed: false },
                    { id: "sf-42", title: "Sending and receiving", type: "learn", completed: false },
                    { id: "sf-43", title: "Money and finance", type: "learn", completed: false },
                    { id: "sf-44", title: "At the library", type: "learn", completed: false },
                ],
            },
            // Module 06: Work and Study
            {
                id: "work-study",
                title: "Work and Study",
                description: "Professional and academic English",
                unlocked: true,
                lessons: [
                    { id: "sf-45", title: "Work and study", type: "intro", completed: false },
                    { id: "sf-46", title: "At school", type: "learn", completed: false },
                    { id: "sf-47", title: "Further and higher education", type: "learn", completed: false },
                    { id: "sf-48", title: "Looking for work", type: "learn", completed: false },
                    { id: "sf-49", title: "Applying for a job", type: "learn", completed: false },
                    { id: "sf-50", title: "Job interviews", type: "learn", completed: false },
                    { id: "sf-51", title: "Starting a new job", type: "learn", completed: false },
                    { id: "sf-52", title: "In the workplace", type: "learn", completed: false },
                    { id: "sf-53", title: "Giving a presentation", type: "learn", completed: false },
                    { id: "sf-54", title: "Work meetings", type: "learn", completed: false },
                    { id: "sf-55", title: "Online meetings", type: "learn", completed: false },
                ],
            },
            // Module 07: The Home
            {
                id: "the-home",
                title: "The Home",
                description: "Domestic life and living spaces",
                unlocked: true,
                lessons: [
                    { id: "sf-56", title: "The home", type: "intro", completed: false },
                    { id: "sf-57", title: "Finding a new home", type: "learn", completed: false },
                    { id: "sf-58", title: "Moving house", type: "learn", completed: false },
                    { id: "sf-59", title: "Meeting the neighbours", type: "learn", completed: false },
                    { id: "sf-60", title: "Household chores", type: "learn", completed: false },
                    { id: "sf-61", title: "Home improvements", type: "learn", completed: false },
                    { id: "sf-62", title: "Pets", type: "learn", completed: false },
                    { id: "sf-63", title: "Home emergencies", type: "learn", completed: false },
                    { id: "sf-64", title: "Home entertainment", type: "learn", completed: false },
                ],
            },
            // Module 08: Getting Around
            {
                id: "getting-around",
                title: "Getting Around",
                description: "Transport and travel logistics",
                unlocked: true,
                lessons: [
                    { id: "sf-65", title: "Getting around", type: "intro", completed: false },
                    { id: "sf-66", title: "Buses and coaches", type: "learn", completed: false },
                    { id: "sf-67", title: "Train and metro travel", type: "learn", completed: false },
                    { id: "sf-68", title: "At the airport", type: "learn", completed: false },
                    { id: "sf-69", title: "Cycling", type: "learn", completed: false },
                    { id: "sf-70", title: "Taxis", type: "learn", completed: false },
                    { id: "sf-71", title: "At the garage", type: "learn", completed: false },
                ],
            },
            // Module 09: On Holiday
            {
                id: "on-holiday",
                title: "On Holiday",
                description: "Vacation and leisure travel",
                unlocked: true,
                lessons: [
                    { id: "sf-72", title: "On holiday", type: "intro", completed: false },
                    { id: "sf-73", title: "Booking a holiday", type: "learn", completed: false },
                    { id: "sf-74", title: "Staying in a hotel", type: "learn", completed: false },
                    { id: "sf-75", title: "City sightseeing", type: "learn", completed: false },
                    { id: "sf-76", title: "Going camping", type: "learn", completed: false },
                    { id: "sf-77", title: "At the beach", type: "learn", completed: false },
                    { id: "sf-78", title: "Finding your way", type: "learn", completed: false },
                    { id: "sf-79", title: "Holiday problems", type: "learn", completed: false },
                ],
            },
            // Module 10: Health and Medicine
            {
                id: "health-medicine",
                title: "Health and Medicine",
                description: "Medical and wellness vocabulary",
                unlocked: true,
                lessons: [
                    { id: "sf-80", title: "Health and medicine", type: "intro", completed: false },
                    { id: "sf-81", title: "At the pharmacy", type: "learn", completed: false },
                    { id: "sf-82", title: "Booking an appointment", type: "learn", completed: false },
                    { id: "sf-83", title: "Seeing the doctor", type: "learn", completed: false },
                    { id: "sf-84", title: "Injuries and emergencies", type: "learn", completed: false },
                    { id: "sf-85", title: "The hospital", type: "learn", completed: false },
                    { id: "sf-86", title: "Dental care", type: "learn", completed: false },
                    { id: "sf-87", title: "Mental health support", type: "learn", completed: false },
                ],
            },
            // Module 11: Media and Communications
            {
                id: "media-communications",
                title: "Media and Communications",
                description: "Digital and traditional communication",
                unlocked: true,
                lessons: [
                    { id: "sf-88", title: "Media and communications", type: "intro", completed: false },
                    { id: "sf-89", title: "Formal phone calls", type: "learn", completed: false },
                    { id: "sf-90", title: "Informal phone calls", type: "learn", completed: false },
                    { id: "sf-91", title: "Using the internet", type: "learn", completed: false },
                    { id: "sf-92", title: "Digital problems", type: "learn", completed: false },
                    { id: "sf-93", title: "Emails", type: "learn", completed: false },
                    { id: "sf-94", title: "Messaging and video calls", type: "learn", completed: false },
                    { id: "sf-95", title: "Social media", type: "learn", completed: false },
                    { id: "sf-96", title: "Reading", type: "learn", completed: false },
                ],
            },
        ],
    },
    {
        id: "application",
        title: "Application",
        tagline: "i wanna be able to use in my personal use cases",
        description: "Apply your English skills to real-world scenarios — from job interviews to living abroad, mastering situational English that matters.",
        icon: "💼",
        color: "bg-cocoa",
        accentColor: "#4B463E",
        unlocked: true,
        modules: [
            // ═══════════════════════════════════════════════════════════════
            // 1. JOB & CAREER (biggest money + urgency)
            // ═══════════════════════════════════════════════════════════════

            // 1A. Job Hunting & Interviews
            {
                id: "job-hunting-interviews",
                title: "Job Hunting & Interviews",
                description: "Master the art of selling yourself in any interview context",
                unlocked: true,
                lessons: [
                    { id: "app-jh-01", title: "Interview Mindset", type: "intro", completed: false },
                    { id: "app-jh-02", title: "Fresh Graduate Interviews (HR)", type: "learn", completed: false },
                    { id: "app-jh-03", title: "Fresh Graduate Interviews (Technical)", type: "learn", completed: false },
                    { id: "app-jh-04", title: "Mid-Career Job Switch", type: "learn", completed: false },
                    { id: "app-jh-05", title: "FAANG / Global Tech Interviews", type: "learn", completed: false },
                    { id: "app-jh-06", title: "Consulting Interviews (Case)", type: "learn", completed: false },
                    { id: "app-jh-07", title: "Consulting Interviews (Fit)", type: "learn", completed: false },
                    { id: "app-jh-08", title: "Finance Interviews (IB / Accounting)", type: "learn", completed: false },
                    { id: "app-jh-09", title: "Startup Interviews (Culture)", type: "learn", completed: false },
                    { id: "app-jh-10", title: "Behavioral Interviews", type: "learn", completed: false },
                    { id: "app-jh-11", title: "Online Interviews (Zoom Etiquette)", type: "learn", completed: false },
                    { id: "app-jh-12", title: "English Assessment Interviews", type: "learn", completed: false },
                ],
            },
            // 1B. Workplace English
            {
                id: "workplace-english",
                title: "Workplace English",
                description: "Thrive in your English-speaking workplace after getting hired",
                unlocked: true,
                lessons: [
                    { id: "app-wp-01", title: "First Day Conversations", type: "intro", completed: false },
                    { id: "app-wp-02", title: "Talking to Foreign Managers", type: "learn", completed: false },
                    { id: "app-wp-03", title: "Talking to Foreign Subordinates", type: "learn", completed: false },
                    { id: "app-wp-04", title: "Giving Status Updates", type: "learn", completed: false },
                    { id: "app-wp-05", title: "Asking for Clarification", type: "learn", completed: false },
                    { id: "app-wp-06", title: "Disagreeing Politely", type: "learn", completed: false },
                    { id: "app-wp-07", title: "Giving Feedback", type: "learn", completed: false },
                    { id: "app-wp-08", title: "Receiving Criticism", type: "learn", completed: false },
                    { id: "app-wp-09", title: "Office Small Talk", type: "learn", completed: false },
                    { id: "app-wp-10", title: "Performance Reviews", type: "learn", completed: false },
                    { id: "app-wp-11", title: "Salary Negotiation", type: "learn", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 2. BUSINESS & PROFESSIONAL
            // ═══════════════════════════════════════════════════════════════

            // 2A. Sales & Client-Facing
            {
                id: "sales-client-facing",
                title: "Sales & Client-Facing",
                description: "Close deals and build relationships in English",
                unlocked: true,
                lessons: [
                    { id: "app-sc-01", title: "B2B Sales Pitches", type: "intro", completed: false },
                    { id: "app-sc-02", title: "B2C Retail Conversations", type: "learn", completed: false },
                    { id: "app-sc-03", title: "Cold Calling", type: "learn", completed: false },
                    { id: "app-sc-04", title: "Product Demos", type: "learn", completed: false },
                    { id: "app-sc-05", title: "Handling Objections", type: "learn", completed: false },
                    { id: "app-sc-06", title: "Negotiation English", type: "learn", completed: false },
                    { id: "app-sc-07", title: "Follow-up Conversations", type: "learn", completed: false },
                    { id: "app-sc-08", title: "Trade Show Conversations", type: "learn", completed: false },
                ],
            },
            // 2B. Corporate Communication
            {
                id: "corporate-communication",
                title: "Corporate Communication",
                description: "Lead meetings, present, and navigate corporate culture",
                unlocked: true,
                lessons: [
                    { id: "app-cc-01", title: "Business Meetings", type: "intro", completed: false },
                    { id: "app-cc-02", title: "Leading Meetings", type: "learn", completed: false },
                    { id: "app-cc-03", title: "Presentations", type: "learn", completed: false },
                    { id: "app-cc-04", title: "Q&A Handling", type: "learn", completed: false },
                    { id: "app-cc-05", title: "Cross-Cultural Meetings", type: "learn", completed: false },
                    { id: "app-cc-06", title: "Email to Call Transitions", type: "learn", completed: false },
                    { id: "app-cc-07", title: "Crisis Communication", type: "learn", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 3. EXAMS & CREDENTIALS
            // ═══════════════════════════════════════════════════════════════
            {
                id: "exams-credentials",
                title: "Exams & Credentials",
                description: "Hack the tests that open doors",
                unlocked: true,
                lessons: [
                    { id: "app-ex-01", title: "IELTS Speaking", type: "intro", completed: false },
                    { id: "app-ex-02", title: "TOEFL Speaking", type: "learn", completed: false },
                    { id: "app-ex-03", title: "TOEIC Speaking", type: "learn", completed: false },
                    { id: "app-ex-04", title: "Duolingo English Test", type: "learn", completed: false },
                    { id: "app-ex-05", title: "University Admission Interviews", type: "learn", completed: false },
                    { id: "app-ex-06", title: "Scholarship Interviews", type: "learn", completed: false },
                    { id: "app-ex-07", title: "Visa Interviews (US/Canada/AU)", type: "learn", completed: false },
                    { id: "app-ex-08", title: "Company Certification Interviews", type: "learn", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 4. IMMIGRATION & LIVING ABROAD
            // ═══════════════════════════════════════════════════════════════

            // 4A. Immigration & Legal
            {
                id: "immigration-legal",
                title: "Immigration & Legal",
                description: "Navigate borders, visas, and official encounters",
                unlocked: true,
                lessons: [
                    { id: "app-im-01", title: "Airport Immigration", type: "intro", completed: false },
                    { id: "app-im-02", title: "Border Control Questions", type: "learn", completed: false },
                    { id: "app-im-03", title: "Visa Renewal Interviews", type: "learn", completed: false },
                    { id: "app-im-04", title: "Embassy Conversations", type: "learn", completed: false },
                    { id: "app-im-05", title: "Police Interaction", type: "learn", completed: false },
                ],
            },
            // 4B. Daily Life Abroad
            {
                id: "daily-life-abroad",
                title: "Daily Life Abroad",
                description: "Survive and thrive in English-speaking countries",
                unlocked: true,
                lessons: [
                    { id: "app-dl-01", title: "Renting an Apartment", type: "intro", completed: false },
                    { id: "app-dl-02", title: "Talking to Landlords", type: "learn", completed: false },
                    { id: "app-dl-03", title: "Utility Issues", type: "learn", completed: false },
                    { id: "app-dl-04", title: "Bank Conversations", type: "learn", completed: false },
                    { id: "app-dl-05", title: "Hospital & Clinic Visits", type: "learn", completed: false },
                    { id: "app-dl-06", title: "Insurance Claims", type: "learn", completed: false },
                    { id: "app-dl-07", title: "Child's School Teachers", type: "learn", completed: false },
                    { id: "app-dl-08", title: "Talking to Neighbors", type: "learn", completed: false },
                    { id: "app-dl-09", title: "Complaining Politely", type: "learn", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 5. SOCIAL & RELATIONSHIP ENGLISH
            // ═══════════════════════════════════════════════════════════════

            // 5A. Socializing
            {
                id: "socializing",
                title: "Socializing",
                description: "Connect, charm, and build friendships",
                unlocked: true,
                lessons: [
                    { id: "app-so-01", title: "Making Friends", type: "intro", completed: false },
                    { id: "app-so-02", title: "Party Conversations", type: "learn", completed: false },
                    { id: "app-so-03", title: "Small Talk Mastery", type: "learn", completed: false },
                    { id: "app-so-04", title: "Jokes & Humor", type: "learn", completed: false },
                    { id: "app-so-05", title: "Group Conversations", type: "learn", completed: false },
                    { id: "app-so-06", title: "Storytelling", type: "learn", completed: false },
                ],
            },
            // 5B. Dating & Relationships
            {
                id: "dating-relationships",
                title: "Dating & Relationships",
                description: "Express feelings and navigate romantic situations",
                unlocked: true,
                lessons: [
                    { id: "app-dr-01", title: "Dating App Conversations", type: "intro", completed: false },
                    { id: "app-dr-02", title: "First Dates", type: "learn", completed: false },
                    { id: "app-dr-03", title: "Expressing Interest", type: "learn", completed: false },
                    { id: "app-dr-04", title: "Rejecting Politely", type: "learn", completed: false },
                    { id: "app-dr-05", title: "Conflict Discussions", type: "learn", completed: false },
                    { id: "app-dr-06", title: "Emotional Vocabulary", type: "learn", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 6. TRAVEL & HOSPITALITY
            // ═══════════════════════════════════════════════════════════════
            {
                id: "travel-hospitality",
                title: "Travel & Hospitality",
                description: "Navigate the world with confidence",
                unlocked: true,
                lessons: [
                    { id: "app-tr-01", title: "Hotel Check-in/out", type: "intro", completed: false },
                    { id: "app-tr-02", title: "Restaurants & Ordering", type: "learn", completed: false },
                    { id: "app-tr-03", title: "Asking for Directions", type: "learn", completed: false },
                    { id: "app-tr-04", title: "Airport Problems", type: "learn", completed: false },
                    { id: "app-tr-05", title: "Lost Baggage", type: "learn", completed: false },
                    { id: "app-tr-06", title: "Travel Emergencies", type: "learn", completed: false },
                    { id: "app-tr-07", title: "Tour Guide Interactions", type: "learn", completed: false },
                    { id: "app-tr-08", title: "Airbnb Host Communication", type: "learn", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 7. ACADEMIC & RESEARCH
            // ═══════════════════════════════════════════════════════════════
            {
                id: "academic-research",
                title: "Academic & Research",
                description: "Thrive in English-speaking academic environments",
                unlocked: true,
                lessons: [
                    { id: "app-ac-01", title: "University Seminars", type: "intro", completed: false },
                    { id: "app-ac-02", title: "Asking Questions in Class", type: "learn", completed: false },
                    { id: "app-ac-03", title: "Academic Presentations", type: "learn", completed: false },
                    { id: "app-ac-04", title: "Research Conferences", type: "learn", completed: false },
                    { id: "app-ac-05", title: "Poster Sessions", type: "learn", completed: false },
                    { id: "app-ac-06", title: "Networking at Conferences", type: "learn", completed: false },
                    { id: "app-ac-07", title: "Supervisor Meetings", type: "learn", completed: false },
                    { id: "app-ac-08", title: "Defending Ideas", type: "learn", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 8. ONLINE & DIGITAL LIFE
            // ═══════════════════════════════════════════════════════════════
            {
                id: "online-digital",
                title: "Online & Digital Life",
                description: "Communicate in the digital world",
                unlocked: true,
                lessons: [
                    { id: "app-on-01", title: "Gaming Voice Chat", type: "intro", completed: false },
                    { id: "app-on-02", title: "Discord Conversations", type: "learn", completed: false },
                    { id: "app-on-03", title: "Slack Communication", type: "learn", completed: false },
                    { id: "app-on-04", title: "Remote Team Collaboration", type: "learn", completed: false },
                    { id: "app-on-05", title: "Customer Support Chats", type: "learn", completed: false },
                    { id: "app-on-06", title: "YouTube/Twitch Interaction", type: "learn", completed: false },
                    { id: "app-on-07", title: "Social Media Debates", type: "learn", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 9. CUSTOMER SERVICE & FRONTLINE
            // ═══════════════════════════════════════════════════════════════
            {
                id: "customer-service",
                title: "Customer Service & Frontline",
                description: "Professional English for service industries",
                unlocked: true,
                lessons: [
                    { id: "app-cs-01", title: "Hotel Staff English", type: "intro", completed: false },
                    { id: "app-cs-02", title: "Restaurant Staff English", type: "learn", completed: false },
                    { id: "app-cs-03", title: "Retail Staff English", type: "learn", completed: false },
                    { id: "app-cs-04", title: "Airport Staff English", type: "learn", completed: false },
                    { id: "app-cs-05", title: "Tourist Guide English", type: "learn", completed: false },
                    { id: "app-cs-06", title: "Call Center English", type: "learn", completed: false },
                    { id: "app-cs-07", title: "Complaint Handling", type: "learn", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 10. CULTURAL TRANSLATION LAYER (Secret Weapon)
            // ═══════════════════════════════════════════════════════════════
            {
                id: "cultural-translation",
                title: "Cultural Translation",
                description: "The hidden rules that make or break communication",
                unlocked: true,
                lessons: [
                    { id: "app-ct-01", title: "How Westerners Structure Answers", type: "intro", completed: false },
                    { id: "app-ct-02", title: "Answer Length (Too Short vs Right)", type: "learn", completed: false },
                    { id: "app-ct-03", title: "Directness Calibration", type: "learn", completed: false },
                    { id: "app-ct-04", title: "Saying No Without No", type: "learn", completed: false },
                    { id: "app-ct-05", title: "Turn-Taking Rules", type: "learn", completed: false },
                    { id: "app-ct-06", title: "Confidence Signaling", type: "learn", completed: false },
                    { id: "app-ct-07", title: "Thinking Out Loud", type: "learn", completed: false },
                ],
            },
        ],
    },

    {
        id: "apex-communicator",
        title: "Apex Communicator",
        tagline: "My English is good, but I want to be expressive",
        description: "Think in English. Shape ideas. Develop presence. This is intellectual English — not IELTS, not HR-safe. Language as self-expression.",
        icon: "⭐",
        color: "bg-cocoa",
        accentColor: "#4B463E",
        unlocked: true,
        modules: [
            // ═══════════════════════════════════════════════════════════════
            // 1. CORE SKILL PILLARS (Skill-based, NOT scenario-based)
            // ═══════════════════════════════════════════════════════════════

            // 1A. Opinion Formation
            {
                id: "opinion-formation",
                title: "Opinion Formation",
                description: "Generate and defend opinions on the fly",
                unlocked: true,
                lessons: [
                    { id: "apex-op-01", title: "The Opinion Gap", type: "intro", completed: false },
                    { id: "apex-op-02", title: "Forced Stance", type: "practice", completed: false },
                    { id: "apex-op-03", title: "Steelman the Opposition", type: "practice", completed: false },
                    { id: "apex-op-04", title: "One-Minute Opinion", type: "practice", completed: false },
                    { id: "apex-op-05", title: "Opinion → Counterargument → Synthesis", type: "practice", completed: false },
                    { id: "apex-op-06", title: "Controversial Takes", type: "practice", completed: false },
                    { id: "apex-op-07", title: "Agree or Disagree (And Why)", type: "practice", completed: false },
                ],
            },
            // 1B. Idea Compression
            {
                id: "idea-compression",
                title: "Idea Compression",
                description: "Sound smart by saying less",
                unlocked: true,
                lessons: [
                    { id: "apex-ic-01", title: "Why Compression Matters", type: "intro", completed: false },
                    { id: "apex-ic-02", title: "300 → 50 → 1 Sentence", type: "practice", completed: false },
                    { id: "apex-ic-03", title: "One-Line Philosophy", type: "practice", completed: false },
                    { id: "apex-ic-04", title: "The Elevator Thesis", type: "practice", completed: false },
                    { id: "apex-ic-05", title: "Tweet-Length Arguments", type: "practice", completed: false },
                    { id: "apex-ic-06", title: "Headline Writing for Ideas", type: "practice", completed: false },
                    { id: "apex-ic-07", title: "Summarize Aristotle in One Line", type: "practice", completed: false },
                    { id: "apex-ic-08", title: "Turn Arguments into Punchy Lines", type: "practice", completed: false },
                ],
            },
            // 1C. Logical Structuring (Anti-Rambling)
            {
                id: "logical-structuring",
                title: "Logical Structuring",
                description: "Order your thoughts, kill the ramble",
                unlocked: true,
                lessons: [
                    { id: "apex-ls-01", title: "The Rambling Problem", type: "intro", completed: false },
                    { id: "apex-ls-02", title: "Claim → Reason → Example", type: "learn", completed: false },
                    { id: "apex-ls-03", title: "Premise → Premise → Conclusion", type: "learn", completed: false },
                    { id: "apex-ls-04", title: "Problem → Cause → Effect → Solution", type: "learn", completed: false },
                    { id: "apex-ls-05", title: "Contrast Framing", type: "learn", completed: false },
                    { id: "apex-ls-06", title: "Rebuild Messy Paragraphs", type: "practice", completed: false },
                    { id: "apex-ls-07", title: "Spot Logical Gaps", type: "practice", completed: false },
                    { id: "apex-ls-08", title: "Remove Redundancy", type: "practice", completed: false },
                ],
            },
            // 1D. Rhetoric & Persuasion
            {
                id: "rhetoric-persuasion",
                title: "Rhetoric & Persuasion",
                description: "Language as weapon — framing, contrast, power",
                unlocked: true,
                lessons: [
                    { id: "apex-rp-01", title: "Rhetorical Instinct", type: "intro", completed: false },
                    { id: "apex-rp-02", title: "The Art of Framing", type: "learn", completed: false },
                    { id: "apex-rp-03", title: "Contrast & Comparison", type: "learn", completed: false },
                    { id: "apex-rp-04", title: "Strategic Repetition", type: "learn", completed: false },
                    { id: "apex-rp-05", title: "Metaphor & Analogy", type: "learn", completed: false },
                    { id: "apex-rp-06", title: "Rhetorical Questions", type: "learn", completed: false },
                    { id: "apex-rp-07", title: "Emphasis Without Shouting", type: "learn", completed: false },
                    { id: "apex-rp-08", title: "Rewrite Boring → Persuasive", type: "practice", completed: false },
                    { id: "apex-rp-09", title: "Same Idea, Four Tones", type: "practice", completed: false },
                    { id: "apex-rp-10", title: "Argue to Different Audiences", type: "practice", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 2. EXPRESSIVE MODES (How you package ideas)
            // ═══════════════════════════════════════════════════════════════

            // 2A. Philosophical Response Mode
            {
                id: "philosophical-response",
                title: "Philosophical Response",
                description: "Judgment, not summary — engage with big ideas",
                unlocked: true,
                lessons: [
                    { id: "apex-ph-01", title: "Reading Like a Thinker", type: "intro", completed: false },
                    { id: "apex-ph-02", title: "What Does the Author Get Wrong?", type: "practice", completed: false },
                    { id: "apex-ph-03", title: "Is This Idea Still Relevant?", type: "practice", completed: false },
                    { id: "apex-ph-04", title: "Apply Ancient Ideas to Modern Life", type: "practice", completed: false },
                    { id: "apex-ph-05", title: "Clear Stance + Personal Interpretation", type: "practice", completed: false },
                    { id: "apex-ph-06", title: "Engaging with Nietzsche", type: "practice", completed: false },
                    { id: "apex-ph-07", title: "Engaging with Modern Essays", type: "practice", completed: false },
                ],
            },
            // 2B. Debate & Intellectual Sparring
            {
                id: "debate-sparring",
                title: "Debate & Intellectual Sparring",
                description: "Disagree, rebut, hold tension — without being rude",
                unlocked: true,
                lessons: [
                    { id: "apex-db-01", title: "The Art of Disagreement", type: "intro", completed: false },
                    { id: "apex-db-02", title: "Rapid-Fire Rebuttals", type: "practice", completed: false },
                    { id: "apex-db-03", title: "Interrupt & Recover", type: "practice", completed: false },
                    { id: "apex-db-04", title: "Clarify Misunderstood Positions", type: "practice", completed: false },
                    { id: "apex-db-05", title: "\"That sounds right, but...\"", type: "learn", completed: false },
                    { id: "apex-db-06", title: "Disagree Without Sounding Rude", type: "practice", completed: false },
                    { id: "apex-db-07", title: "Think While Speaking", type: "practice", completed: false },
                    { id: "apex-db-08", title: "Holding Intellectual Tension", type: "practice", completed: false },
                ],
            },
            // 2C. Podcast / Long-Form Thinking
            {
                id: "podcast-thinking",
                title: "Podcast & Long-Form Thinking",
                description: "Sustain coherent thought for 10-30 minutes",
                unlocked: true,
                lessons: [
                    { id: "apex-pc-01", title: "Thinking Out Loud", type: "intro", completed: false },
                    { id: "apex-pc-02", title: "Verbal Signposting", type: "learn", completed: false },
                    { id: "apex-pc-03", title: "Staying Coherent Over Time", type: "learn", completed: false },
                    { id: "apex-pc-04", title: "Abstract → Concrete Examples", type: "learn", completed: false },
                    { id: "apex-pc-05", title: "3-Minute Uninterrupted Monologue", type: "practice", completed: false },
                    { id: "apex-pc-06", title: "Ramble → Structured Summary", type: "practice", completed: false },
                    { id: "apex-pc-07", title: "Explain to a Smart Friend", type: "practice", completed: false },
                    { id: "apex-pc-08", title: "10-Minute Deep Dive", type: "practice", completed: false },
                ],
            },
            // 2D. Personal Voice Development
            {
                id: "personal-voice",
                title: "Personal Voice Development",
                description: "Language as identity, not performance",
                unlocked: true,
                lessons: [
                    { id: "apex-pv-01", title: "Finding Your Voice", type: "intro", completed: false },
                    { id: "apex-pv-02", title: "What Do You Believe That Others Don't?", type: "practice", completed: false },
                    { id: "apex-pv-03", title: "Core Beliefs Articulation", type: "practice", completed: false },
                    { id: "apex-pv-04", title: "Personal Philosophy Statements", type: "practice", completed: false },
                    { id: "apex-pv-05", title: "Values Under Pressure", type: "practice", completed: false },
                    { id: "apex-pv-06", title: "Story → Insight → Belief", type: "practice", completed: false },
                    { id: "apex-pv-07", title: "Authentic Self-Expression", type: "practice", completed: false },
                ],
            },

            // ═══════════════════════════════════════════════════════════════
            // 3. APEX USE CASES (Who this is for)
            // ═══════════════════════════════════════════════════════════════
            {
                id: "thought-leadership",
                title: "Thought Leadership",
                description: "For founders, executives, and public figures",
                unlocked: true,
                lessons: [
                    { id: "apex-tl-01", title: "The Thought Leader Mindset", type: "intro", completed: false },
                    { id: "apex-tl-02", title: "Building Intellectual Authority", type: "learn", completed: false },
                    { id: "apex-tl-03", title: "Vision Articulation", type: "practice", completed: false },
                    { id: "apex-tl-04", title: "Fluency to Presence", type: "learn", completed: false },
                    { id: "apex-tl-05", title: "Executive Communication", type: "practice", completed: false },
                ],
            },
            {
                id: "content-creators",
                title: "Content Creators",
                description: "For podcasters, YouTubers, and writers",
                unlocked: true,
                lessons: [
                    { id: "apex-cc-01", title: "Creator Voice", type: "intro", completed: false },
                    { id: "apex-cc-02", title: "Engaging Monologues", type: "practice", completed: false },
                    { id: "apex-cc-03", title: "Interview Guest Mode", type: "practice", completed: false },
                    { id: "apex-cc-04", title: "Hot Takes That Land", type: "practice", completed: false },
                    { id: "apex-cc-05", title: "Transitioning to English Content", type: "learn", completed: false },
                ],
            },
            {
                id: "academic-presence",
                title: "Academic Presence",
                description: "For professors, researchers, and conference speakers",
                unlocked: true,
                lessons: [
                    { id: "apex-ap-01", title: "Academic Authority", type: "intro", completed: false },
                    { id: "apex-ap-02", title: "Defending Your Research", type: "practice", completed: false },
                    { id: "apex-ap-03", title: "Q&A Mastery", type: "practice", completed: false },
                    { id: "apex-ap-04", title: "Keynote Delivery", type: "practice", completed: false },
                    { id: "apex-ap-05", title: "Cross-Disciplinary Translation", type: "learn", completed: false },
                ],
            },
        ],
    },
];

export function getLevelById(id: string): Level | undefined {
    return levels.find((l) => l.id === id);
}

export function getModuleById(levelId: string, moduleId: string): Module | undefined {
    const level = getLevelById(levelId);
    return level?.modules.find((m) => m.id === moduleId);
}
