// Alphabet data for Letters lesson
// Each letter includes pronunciation, sounds, example words, and trivia

export interface LetterSound {
    name: string;
    example: string;
    highlighted: string; // The part of word to highlight
}

export interface AlphabetLetter {
    letter: string;
    uppercase: string;
    lowercase: string;
    ipa: string;
    pronunciation: string; // How it's said (AY, BEE, etc.)
    sounds: LetterSound[];
    trivia: string;
}

export const alphabetData: AlphabetLetter[] = [
    {
        letter: "A",
        uppercase: "A",
        lowercase: "a",
        ipa: "/eɪ/",
        pronunciation: "AY",
        sounds: [
            { name: "short A", example: "apple", highlighted: "a" },
            { name: "long A", example: "cake", highlighted: "a" },
        ],
        trivia: '"A" is the first letter of the English alphabet and one of the most common vowels in the language. Its shape comes from an ancient Phoenician symbol for an ox\'s head, turned upside down over thousands of years.',
    },
    {
        letter: "B",
        uppercase: "B",
        lowercase: "b",
        ipa: "/biː/",
        pronunciation: "BEE",
        sounds: [
            { name: "B sound", example: "ball", highlighted: "b" },
            { name: "silent B", example: "climb", highlighted: "b" },
        ],
        trivia: '"B" comes from the Egyptian hieroglyph for "house." The Phoenicians called it "beth" meaning house, which is why the Greek letter is called "beta."',
    },
    {
        letter: "C",
        uppercase: "C",
        lowercase: "c",
        ipa: "/siː/",
        pronunciation: "SEE",
        sounds: [
            { name: "hard C", example: "cat", highlighted: "c" },
            { name: "soft C", example: "city", highlighted: "c" },
        ],
        trivia: '"C" can make two sounds: a hard sound like "k" before a, o, u (cat, cold), and a soft sound like "s" before e, i, y (cent, city).',
    },
    {
        letter: "D",
        uppercase: "D",
        lowercase: "d",
        ipa: "/diː/",
        pronunciation: "DEE",
        sounds: [
            { name: "D sound", example: "dog", highlighted: "d" },
            { name: "flap D", example: "ladder", highlighted: "dd" },
        ],
        trivia: '"D" originated from a Phoenician letter called "daleth" meaning "door." The shape evolved from a triangle representing a tent door.',
    },
    {
        letter: "E",
        uppercase: "E",
        lowercase: "e",
        ipa: "/iː/",
        pronunciation: "EE",
        sounds: [
            { name: "short E", example: "bed", highlighted: "e" },
            { name: "long E", example: "me", highlighted: "e" },
        ],
        trivia: '"E" is the most commonly used letter in English. It appears in about 11% of all words. Many words would look strange without it!',
    },
    {
        letter: "F",
        uppercase: "F",
        lowercase: "f",
        ipa: "/ɛf/",
        pronunciation: "EF",
        sounds: [
            { name: "F sound", example: "fish", highlighted: "f" },
            { name: "F in -ful", example: "helpful", highlighted: "f" },
        ],
        trivia: '"F" comes from a Phoenician letter shaped like a hook, used for a "w" sound. The Romans gave it the "f" sound we use today.',
    },
    {
        letter: "G",
        uppercase: "G",
        lowercase: "g",
        ipa: "/dʒiː/",
        pronunciation: "JEE",
        sounds: [
            { name: "hard G", example: "go", highlighted: "g" },
            { name: "soft G", example: "giant", highlighted: "g" },
        ],
        trivia: '"G" was invented by the Romans! They added a small stroke to "C" to distinguish between the "k" and "g" sounds.',
    },
    {
        letter: "H",
        uppercase: "H",
        lowercase: "h",
        ipa: "/eɪtʃ/",
        pronunciation: "AYCH",
        sounds: [
            { name: "H sound", example: "hat", highlighted: "h" },
            { name: "silent H", example: "hour", highlighted: "h" },
        ],
        trivia: '"H" represents a breath of air. It\'s silent at the start of many words borrowed from French, like "hour" and "honest."',
    },
    {
        letter: "I",
        uppercase: "I",
        lowercase: "i",
        ipa: "/aɪ/",
        pronunciation: "EYE",
        sounds: [
            { name: "short I", example: "sit", highlighted: "i" },
            { name: "long I", example: "bike", highlighted: "i" },
        ],
        trivia: '"I" is also a complete word — the only single-letter word that\'s always capitalized in English. It refers to yourself!',
    },
    {
        letter: "J",
        uppercase: "J",
        lowercase: "j",
        ipa: "/dʒeɪ/",
        pronunciation: "JAY",
        sounds: [
            { name: "J sound", example: "jump", highlighted: "j" },
            { name: "Spanish J", example: "jalapeño", highlighted: "j" },
        ],
        trivia: '"J" was the last letter added to the English alphabet! Until the 1600s, "I" and "J" were the same letter.',
    },
    {
        letter: "K",
        uppercase: "K",
        lowercase: "k",
        ipa: "/keɪ/",
        pronunciation: "KAY",
        sounds: [
            { name: "K sound", example: "kite", highlighted: "k" },
            { name: "silent K", example: "knife", highlighted: "k" },
        ],
        trivia: '"K" is silent before "n" at the start of words like "knife," "knee," and "know." This wasn\'t always the case — people used to pronounce the K!',
    },
    {
        letter: "L",
        uppercase: "L",
        lowercase: "l",
        ipa: "/ɛl/",
        pronunciation: "EL",
        sounds: [
            { name: "L sound", example: "light", highlighted: "l" },
            { name: "dark L", example: "ball", highlighted: "ll" },
        ],
        trivia: '"L" at the end of a word sounds slightly different than at the beginning. Try saying "light" vs "ball" — feel the difference!',
    },
    {
        letter: "M",
        uppercase: "M",
        lowercase: "m",
        ipa: "/ɛm/",
        pronunciation: "EM",
        sounds: [
            { name: "M sound", example: "mom", highlighted: "m" },
            { name: "humming M", example: "hum", highlighted: "m" },
        ],
        trivia: '"M" is often the first consonant babies learn to say. That\'s why "mama" is similar in so many languages around the world!',
    },
    {
        letter: "N",
        uppercase: "N",
        lowercase: "n",
        ipa: "/ɛn/",
        pronunciation: "EN",
        sounds: [
            { name: "N sound", example: "no", highlighted: "n" },
            { name: "ng sound", example: "sing", highlighted: "ng" },
        ],
        trivia: '"N" often pairs with "g" to make the "ng" sound, like in "running" or "song." This is actually a single sound!',
    },
    {
        letter: "O",
        uppercase: "O",
        lowercase: "o",
        ipa: "/oʊ/",
        pronunciation: "OH",
        sounds: [
            { name: "short O", example: "hot", highlighted: "o" },
            { name: "long O", example: "home", highlighted: "o" },
        ],
        trivia: '"O" is one of the oldest letters, barely changed from ancient times. Its round shape may represent the sun or an eye.',
    },
    {
        letter: "P",
        uppercase: "P",
        lowercase: "p",
        ipa: "/piː/",
        pronunciation: "PEE",
        sounds: [
            { name: "P sound", example: "pen", highlighted: "p" },
            { name: "silent P", example: "psychology", highlighted: "p" },
        ],
        trivia: '"P" is silent at the start of some Greek-origin words: psychology, pneumonia, pterodactyl. The "p" was pronounced in ancient Greek!',
    },
    {
        letter: "Q",
        uppercase: "Q",
        lowercase: "q",
        ipa: "/kjuː/",
        pronunciation: "KYOO",
        sounds: [
            { name: "Q sound", example: "queen", highlighted: "qu" },
            { name: "K sound", example: "unique", highlighted: "que" },
        ],
        trivia: '"Q" almost always appears with "u" in English. The combination "qu" makes a "kw" sound. Very few English words have Q without U!',
    },
    {
        letter: "R",
        uppercase: "R",
        lowercase: "r",
        ipa: "/ɑːr/",
        pronunciation: "AR",
        sounds: [
            { name: "R sound", example: "red", highlighted: "r" },
            { name: "silent R", example: "butter", highlighted: "r" },
        ],
        trivia: 'The English "R" sound is unique! Unlike the rolled R in Spanish or the throat R in French, English R curls the tongue back.',
    },
    {
        letter: "S",
        uppercase: "S",
        lowercase: "s",
        ipa: "/ɛs/",
        pronunciation: "ES",
        sounds: [
            { name: "S sound", example: "sun", highlighted: "s" },
            { name: "Z sound", example: "is", highlighted: "s" },
        ],
        trivia: '"S" is a snake letter — it even looks like one! At the end of words, it sometimes sounds like "z" (is, has, dogs).',
    },
    {
        letter: "T",
        uppercase: "T",
        lowercase: "t",
        ipa: "/tiː/",
        pronunciation: "TEE",
        sounds: [
            { name: "T sound", example: "top", highlighted: "t" },
            { name: "flap T", example: "water", highlighted: "t" },
        ],
        trivia: 'In American English, "T" between vowels often sounds like a quick "D" — that\'s why "water" sounds like "wader"!',
    },
    {
        letter: "U",
        uppercase: "U",
        lowercase: "u",
        ipa: "/juː/",
        pronunciation: "YOO",
        sounds: [
            { name: "short U", example: "cup", highlighted: "u" },
            { name: "long U", example: "use", highlighted: "u" },
        ],
        trivia: '"U" and "V" used to be the same letter! Romans wrote "V" for both sounds. "U" became separate only around 400 years ago.',
    },
    {
        letter: "V",
        uppercase: "V",
        lowercase: "v",
        ipa: "/viː/",
        pronunciation: "VEE",
        sounds: [
            { name: "V sound", example: "voice", highlighted: "v" },
            { name: "V in of", example: "of", highlighted: "f" },
        ],
        trivia: '"V" requires your top teeth to touch your bottom lip while vibrating — it\'s the voiced version of "F". Try it: fff → vvv.',
    },
    {
        letter: "W",
        uppercase: "W",
        lowercase: "w",
        ipa: "/ˈdʌbəl.juː/",
        pronunciation: "DOUBLE-YOO",
        sounds: [
            { name: "W sound", example: "water", highlighted: "w" },
            { name: "silent W", example: "write", highlighted: "w" },
        ],
        trivia: '"W" is called "double-u" because it was written as two U\'s (UU) or two V\'s (VV) in medieval times!',
    },
    {
        letter: "X",
        uppercase: "X",
        lowercase: "x",
        ipa: "/ɛks/",
        pronunciation: "EKS",
        sounds: [
            { name: "KS sound", example: "box", highlighted: "x" },
            { name: "Z sound", example: "xylophone", highlighted: "x" },
        ],
        trivia: '"X" at the start of words usually sounds like "Z" (xylophone, Xerox). In the middle or end, it sounds like "ks" (fox, taxi).',
    },
    {
        letter: "Y",
        uppercase: "Y",
        lowercase: "y",
        ipa: "/waɪ/",
        pronunciation: "WYE",
        sounds: [
            { name: "Y consonant", example: "yes", highlighted: "y" },
            { name: "Y vowel", example: "happy", highlighted: "y" },
        ],
        trivia: '"Y" is sometimes called a semi-vowel. It acts like a consonant at the start (yes, young) but like a vowel in the middle or end (gym, happy).',
    },
    {
        letter: "Z",
        uppercase: "Z",
        lowercase: "z",
        ipa: "/ziː/",
        pronunciation: "ZEE",
        sounds: [
            { name: "Z sound", example: "zoo", highlighted: "z" },
            { name: "buzzing Z", example: "buzz", highlighted: "zz" },
        ],
        trivia: 'Americans say "zee" but British say "zed"! "Zed" comes from Greek "zeta." Both are correct — just different traditions.',
    },
];

export function getLetterByIndex(index: number): AlphabetLetter | undefined {
    return alphabetData[index];
}

export function getLetterByChar(char: string): AlphabetLetter | undefined {
    return alphabetData.find(l => l.letter === char.toUpperCase());
}
