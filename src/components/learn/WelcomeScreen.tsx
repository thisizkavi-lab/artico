"use client";

interface WelcomeScreenProps {
    onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
    return (
        <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-6 relative">
            {/* Yellow gradient blur */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-full blur-3xl opacity-60" />

            <div className="relative z-10 text-center max-w-lg">
                <h1 className="text-2xl font-medium text-dark/80 mb-6">
                    welcome to <span className="font-bold text-dark">artiCO</span>
                </h1>

                <p className="text-2xl md:text-3xl font-bold text-dark leading-relaxed mb-2">
                    here, you don&apos;t study English — you train it.
                </p>
                <p className="text-2xl md:text-3xl font-bold text-dark leading-relaxed mb-12">
                    your mouth, your mind, your <span className="italic">rhythm</span>.
                </p>

                {/* Globe icon */}
                <div className="mb-8">
                    <svg
                        className="w-16 h-16 mx-auto text-dark/80"
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <circle cx="24" cy="24" r="18" />
                        <ellipse cx="24" cy="24" rx="8" ry="18" />
                        <path d="M6 24h36" />
                        <path d="M24 6v36" />
                        <path d="M8 12c4 2 10 3 16 3s12-1 16-3" />
                        <path d="M8 36c4-2 10-3 16-3s12 1 16 3" />
                    </svg>
                </div>

                <p className="text-lg text-dark/70 mb-6">
                    ready to start your language <span className="font-medium">training</span>?
                </p>

                <button
                    onClick={onContinue}
                    className="px-10 py-3.5 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark transition-all hover:-translate-y-0.5"
                >
                    Let&apos;s Go
                </button>
            </div>
        </div>
    );
}
