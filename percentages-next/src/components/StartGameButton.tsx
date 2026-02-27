"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StartGameButton() {
    const router = useRouter();
    const [isSignedUp, setIsSignedUp] = useState(false);

    useEffect(() => {
        const playerName = localStorage.getItem("playerName");
        setIsSignedUp(!!playerName);
    }, []);

    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <div
                onMouseEnter={() => !isSignedUp && setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => !isSignedUp && setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                className="relative inline-block w-full"
                tabIndex={!isSignedUp ? 0 : -1} // Allow focus on wrapper if button is disabled
            >
                <button
                    disabled={!isSignedUp}
                    aria-describedby={!isSignedUp ? "signup-tooltip" : undefined}
                    onClick={() => router.push('/game/solo')}
                    className={`w-full py-4 px-8 font-bold text-lg rounded-xl shadow-xl transform transition-all duration-200 ring-1 ring-white/20
                        ${isSignedUp
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white hover:scale-[1.02] active:scale-[0.98]'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-75'
                        }`}
                >
                    Start Solo Game
                </button>
                {showTooltip && (
                    <div
                        id="signup-tooltip"
                        role="tooltip"
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-900 border border-gray-700 text-white text-sm font-medium rounded-lg shadow-2xl whitespace-nowrap z-10 animate-fade-in"
                    >
                        Please sign up first
                    </div>
                )}
            </div>

            {!isSignedUp && (
                <Link
                    href="/"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 underline decoration-gray-600 hover:decoration-white"
                >
                    Don&apos;t have a name yet? Sign Up
                </Link>
            )}
        </div>
    );
}
