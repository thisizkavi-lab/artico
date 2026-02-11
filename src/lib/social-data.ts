import { LessonContent } from "./foundation-data";

export const socialData: Record<string, LessonContent> = {
    // MODULE 1: THE PARTY (Social Basics)
    "party-intro": {
        id: "party-intro",
        blocks: [
            {
                type: "hero",
                title: "The Party: Survival Mode",
                content: "Most English classes teach you how to ask 'How are you?'. I'm going to teach you how to not stand in the corner holding a warm beer while everyone else laughs."
            },
            {
                type: "instruction",
                title: "The Psychology of 'Vibing'",
                content: "Parties are not about exchanging information. They are about energy transfer. If you ask 'What do you do?' immediately, you sound like a cop or a LinkedIn recruiter. We need to be cooler."
            },
            {
                type: "callout",
                variant: "warning",
                title: "The Interview Trap",
                content: "Don't turn a conversation into an interrogation. Question -> Answer -> Question -> Answer = BORING. Use statements instead."
            },
            {
                type: "interactive",
                data: {
                    type: "quiz",
                    question: "Someone says 'I love this song'. What is the best vibe?",
                    options: [
                        "Who sings it?",
                        "Yeah, it reminds me of summer 2019.",
                        "I don't like it.",
                        "What is your job?"
                    ],
                    correct: 1,
                    explanation: "Option 2 adds a 'feeling' or 'memory' (statement) rather than just demanding fact (question). It invites them to share a memory too."
                }
            },
            {
                type: "callout",
                variant: "tip",
                title: "Unorthodox Rule #1",
                content: "Never answer 'How are you?' with just 'Good'. That kills the conversation. Give them a 'hook'—something tiny they can grab onto. 'Good, just exhausted from this crazy week, but ready for a drink.'"
            }
        ]
    },
    "party-entrance": {
        id: "party-entrance",
        blocks: [
            {
                type: "hero",
                title: "The Entrance",
                content: "You just walked in. You don't know anyone except the host (who is busy). Panic sets in. Let's fix that."
            },
            {
                type: "instruction",
                title: "Body Language Audit",
                content: "Before you say a word, your body is speaking. If your shoulders are up and you are looking at your phone, you are screaming 'Don't talk to me'."
            },
            {
                type: "callout",
                variant: "expertise",
                title: "The 'Open' Stance",
                content: "1. Phone in pocket (non-negotiable). 2. Shoulders back. 3. Stand near the food or drinks. It is the natural 'watering hole' where people are happy and looking for an excuse to chat."
            },
            {
                type: "instruction",
                title: "Ammo: The Low-Risk Openers",
                content: "You don't need a magic line. You just need to break the silence barrier. Here are 3 lines that work 99% of the time because they are low-pressure."
            },
            {
                type: "interactive",
                title: "Flashcards: Memorize These",
                data: {
                    type: "flashcards",
                    cards: [
                        { front: "How do you know [Host]?", back: "The absolute safest opener. Connects you both through a mutual friend." },
                        { front: "Is the [food/drink] good?", back: "Low stakes. If they say yes, you try it. If no, you bond over how bad it is." },
                        { front: "I love this place/song.", back: "Positive vibe. People want to agree with positive people." },
                        { front: "Is it just me, or is it [observation]?", back: "Creates 'Us vs The Room'. Instant team building." }
                    ]
                }
            },
            {
                type: "instruction",
                title: "The 'Triangle' Technique",
                content: "If two people are talking in a 'closed' circle, don't interrupt. If their feet are pointed outward (a triangle shape), they are open to a third person. That is your target."
            }
        ]
    },
    "party-mingle": {
        id: "party-mingle",
        blocks: [
            {
                type: "hero",
                title: "The Art of the Mingle",
                content: "You're talking. Now, how do you NOT be boring? The secret is: Be interested, not interesting."
            },
            {
                type: "instruction",
                title: "Active Listening cues",
                content: "Native speakers make noise while listening. If you are silent, you look confused. Use: 'Oh really?', 'No way!', 'That's crazy', 'Right, right'."
            },
            {
                type: "interactive",
                data: {
                    type: "quiz",
                    question: "They say: 'I just got back from Italy.' Best response?",
                    options: [
                        "I went to Italy in 2019!",
                        "Oh nice. Was it for work or fun?",
                        "I love pizza.",
                        "That sounds expensive."
                    ],
                    correct: 1,
                    explanation: "Option 2 keeps the spotlight on THEM. Option 1 hijacks the story. Option 3 is random. Option 4 is rude."
                }
            },
            {
                type: "callout",
                variant: "tip",
                title: "The 80/20 Rule",
                content: "Let them talk 80% of the time. They will leave thinking you are the most interesting conversationalist in the room."
            }
        ]
    },
    "party-exit": {
        id: "party-exit",
        blocks: [
            {
                type: "hero",
                title: "The Exit Strategy",
                content: "Leaving is an art form. Do it wrong, and it's awkward or rude. Do it right, and they miss you."
            },
            {
                type: "instruction",
                title: "The 'High Note' Rule",
                content: "Leave when the conversation is GOOD, not when it has died. Leave them wanting more."
            },
            {
                type: "callout",
                variant: "warning",
                title: "Don't use 'Boring' Excuses",
                content: "Don't say 'I'm tired' or 'I have to wake up early'. It sounds like 'You are boring me'."
            },
            {
                type: "instruction",
                title: "The Golden Exit Lines",
                content: "Be vague but positive. 'Function' over 'Excuse'."
            },
            {
                type: "interactive",
                title: "Exit Line Flashcards",
                data: {
                    type: "flashcards",
                    cards: [
                        { front: "I'm going to grab a refill.", back: "Classic 'pause' button. You can come back or drift away." },
                        { front: "I see my friend over there, I gotta say hi.", back: "Socially acceptable reason to move." },
                        { front: "I've gotta run, but this was great!", back: "The hard exit. Compliment + Action." }
                    ]
                }
            }
        ]
    },

    // MODULE 2: THE DATE (Romantic/Social Intimacy)
    "date-intro": {
        id: "date-intro",
        blocks: [
            {
                type: "hero",
                title: "The Date: High Stakes",
                content: "Dating in a second language is terrifying. You feel like you lose 30% of your Personality IQ. We are going to get that back."
            },
            {
                type: "instruction",
                title: "The Goal",
                content: "It's not to impress them with your vocabulary range. It's to make them feel comfortable and seen."
            },
            {
                type: "callout",
                variant: "expertise",
                title: "Vulnerability is Strength",
                content: "Don't hide your accent or mistakes. Own them. 'My English isn't perfect, but my story is good' is a charming line."
            }
        ]
    },
    "date-icebreakers": {
        id: "date-icebreakers",
        blocks: [
            {
                type: "instruction",
                title: "Breaking the Ice",
                content: "The first 5 minutes decide everything. Do NOT interview them (Where live? What do? How siblings?)."
            },
            {
                type: "instruction",
                title: "Observations > Questions",
                content: "Instead of 'Do you like this bar?', say 'This bar feels like a library that serves alcohol.' Give them something to react to."
            },
            {
                type: "callout",
                variant: "tip",
                title: "Avoid the FORD Method",
                content: "Family, Occupation, Recreation, Dreams. It's too structured for a date. Use 'FORD' for networking, not romance."
            },
            {
                type: "interactive",
                data: {
                    type: "quiz",
                    question: "They ask: 'How was your day?' You say:",
                    options: [
                        "Fine, thanks.",
                        "Good. You?",
                        "Chaotic, but I survived. I need this drink.",
                        "I worked 8 hours."
                    ],
                    correct: 2,
                    explanation: "Option 3 shares an emotion and a 'vibe'. It opens the door for them to ask 'Why chaotic?'"
                }
            }
        ]
    },

    // MODULE 3: THE FIGHT (Conflict Resolution)
    "fight-intro": {
        id: "fight-intro",
        blocks: [
            {
                type: "hero",
                title: "The Fight: Verbal Judo",
                content: "Eventually, you will disagree. In English, direct disagreement can sound very aggressive to native speakers. You need softeners."
            },
            {
                type: "instruction",
                title: "Softening the Blow",
                content: "Don't say 'You are wrong'. Say 'I see it a bit differently'. Don't say 'I don't like it'. Say 'It's not really for me'."
            }
        ]
    },
    "fight-deescalation": {
        id: "fight-deescalation",
        blocks: [
            {
                type: "instruction",
                title: "De-escalation Phrases",
                content: "When things get heated, use these to lower the temperature."
            },
            {
                type: "interactive",
                data: {
                    type: "flashcards",
                    cards: [
                        { front: "I hear what you're saying.", back: "Validates them without agreeing. Stops them from repeating themselves." },
                        { front: "Let's take a step back.", back: "Resets the conversation. Good when you are circling." },
                        { front: "I didn't mean to upset you.", back: "Takes responsibility for impact, not intent. Very mature." }
                    ]
                }
            },
            {
                type: "callout",
                variant: "warning",
                title: "The word 'But'",
                content: "'I hear you, but...' deletes everything you just said. Try substituting 'and'. 'I hear you, and I also think...'"
            }
        ]
    },

    // MODULE 4: THE TRIP (Travel & Logistics)
    "trip-intro": {
        id: "trip-intro",
        blocks: [
            {
                type: "hero",
                title: "The Trip: Beyond the Guidebook",
                content: "Travel English is usually boring. We focus on the fun stuff: Getting upgrades, making friends in hostels, and avoiding scams."
            }
        ]
    },
    "trip-hostel": {
        id: "trip-hostel",
        blocks: [
            {
                type: "instruction",
                title: "Hostel Life",
                content: "The common room is a social minefield. If you wear headphones, you are invisible. If you have a beer, you are a friend."
            },
            {
                type: "instruction",
                title: "Ammo: The Traveller Code",
                content: "'Where have you been so far?' opens the map conversation. 'Where are you going next?' opens the travel buddy conversation."
            }
        ]
    },

    // MODULE 5: THE JOB (Office Politics)
    "job-gossip": {
        id: "job-gossip",
        blocks: [
            {
                type: "hero",
                title: "Office Politics",
                content: "Work isn't just about work. It's about navigating the social hierarchy without getting fired."
            },
            {
                type: "instruction",
                title: "The Art of 'Vagueing'",
                content: "Sometimes you need to speak a lot without saying anything. 'That's an interesting perspective' usually means 'That is a stupid idea'."
            },
            {
                type: "interactive",
                data: {
                    type: "quiz",
                    question: "Your boss asks for something impossible. You say:",
                    options: [
                        "I can't do that.",
                        "That's impossible.",
                        "That might be tricky with our current timeline.",
                        "No."
                    ],
                    correct: 2,
                    explanation: "Option 3 is 'Manager Speak'. It sounds positive but signals a problem."
                }
            }
        ]
    }
};
