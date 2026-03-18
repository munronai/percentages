"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, clearSession } from "@/lib/session";

export default function ResultsPage() {
    const router = useRouter();
    const [score, setScore] = useState(0);

    useEffect(() => {
        const session = getSession();
        if (session) {
            setScore(session.score || 0);
        }
    }, []);

    const handlePlayAgain = () => {
        clearSession();
        router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg w-full text-center border border-gray-700">
                <h1 className="text-4xl font-bold text-red-500 mb-6 uppercase tracking-widest drop-shadow-md">Eliminated!</h1>
                
                <div className="mb-8">
                    <p className="text-gray-400 uppercase tracking-widest text-sm font-semibold mb-2">Final Score</p>
                    <p className="text-6xl font-black text-white drop-shadow-lg">{score}</p>
                </div>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Better luck next time!
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handlePlayAgain}
                        className="w-full py-4 px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold rounded-lg shadow-lg transform transition-all active:scale-[0.98]"
                    >
                        Play Again
                    </button>
                    
                    <Link
                        href="/game/solo/review"
                        className="w-full py-3 px-8 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold rounded-lg transition-colors"
                    >
                        Review Game
                    </Link>

                    <Link
                        href="/"
                        className="text-gray-500 hover:text-gray-300 text-sm underline decoration-gray-700 hover:decoration-gray-500 transition-all mt-2"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
